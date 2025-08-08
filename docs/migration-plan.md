# Decisions (locked)

* **Canonical identity**: `UploadsVideo.id` (a.k.a. `videoId`) — everything references it.
* **Providers**: `YOUTUBE` (current), `LOCAL`, `EXTERNAL` (future).
* **Dedup for LOCAL**: `externalId = sha256(file)`; enforce unique per `(provider, externalId)`.
* **Paths**: `storageKey = "v_{id}"`; filesystem becomes `{BASE}/{storageKey}/...`.
* **publishedAt**: migrate to `DateTime?` now.
* **Channel**: optional on videos; LOCAL videos have `channelId = null`.

---

# Final Prisma schema (paste)

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["typedSql"]
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Provider {
  YOUTUBE
  LOCAL
  EXTERNAL
}

enum ArtifactType {
  VIDEO
  SAVED
  DOWNLOADED
  STORYBOARD
  THUMBNAIL
  SCREENSHOT
}

/** Channels are provider-aware; not required for LOCAL videos */
model Channel {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  title      String           @db.VarChar(255)
  provider   Provider         @default(YOUTUBE)
  externalId String?          @db.VarChar(64)      // e.g., YouTube channel id
  src        String?          @db.VarChar(255)

  videoCount        Int        @default(0)
  fetchStartVideoId String?    @db.VarChar(24)
  fetchedUntilEnd   Boolean    @default(false)
  lastSyncedAt      DateTime?

  uploads UploadsVideo[]

  @@unique([provider, externalId])
}

model UploadsVideo {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  provider   Provider   @default(YOUTUBE)
  ytId       String?    @unique @db.VarChar(24) // legacy lookup
  externalId String?    @db.VarChar(128)        // sha256 for LOCAL, etc.
  storageKey String     @unique                 // e.g. "v_12345"

  title       String
  src         String?         // watch URL (YT) or file path (LOCAL) – keep for now
  publishedAt DateTime?
  duration    Int?

  channelId Int?
  channel   Channel? @relation(fields: [channelId], references: [id], onDelete: SetNull)

  artifact  ArtifactType @default(VIDEO)

  thumbnail   Thumbnail?
  storyboard  Storyboard?
  screenshots Screenshot[]

  @@unique([provider, externalId])
  @@index([channelId, artifact, provider])
}

model Thumbnail {
  id             Int          @id @default(autoincrement())
  uploadsVideoId Int          @unique
  uploadsVideo   UploadsVideo @relation(fields: [uploadsVideoId], references: [id], onDelete: Cascade)

  perRow       Int
  totalSeconds Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Storyboard {
  id             Int          @id @default(autoincrement())
  uploadsVideoId Int          @unique
  uploadsVideo   UploadsVideo @relation(fields: [uploadsVideoId], references: [id], onDelete: Cascade)

  fragments Int
  url       String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Screenshot {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  second          Int
  uploadsVideoId  Int
  uploadsVideo    UploadsVideo @relation(fields: [uploadsVideoId], references: [id], onDelete: Cascade)

  isFav Boolean? @default(false)

  @@index([uploadsVideoId])
}
```

---

# Migration plan (zero downtime for readers; one deploy)

**1) Update schema, create migration**

```bash
# after pasting schema.prisma
npx prisma migrate dev --name decouple_from_youtube --create-only
```

Do **not** run it yet. First, add the backfill steps below to the generated SQL, or run them manually after applying.

**2) Apply migration**

```bash
npx prisma migrate deploy
```

**3) Backfill & rewire data (SQL)**

> Assumes your previous columns still exist: `Channel.ytId`, `Screenshot.ytChannelId`, `Screenshot.ytVideoId`, `UploadsVideo.publishedAt` (STRING).

```sql
-- Provider on Channel
UPDATE Channel SET provider = 'YOUTUBE', externalId = ytId;

-- Provider/externalId/storageKey on UploadsVideo
UPDATE UploadsVideo
SET provider = 'YOUTUBE',
    externalId = ytId,
    storageKey = CONCAT('v_', id)
WHERE provider IS NULL OR storageKey IS NULL;

-- Add temporary column for datetime conversion (if not already created by Prisma)
ALTER TABLE UploadsVideo ADD COLUMN publishedAtTmp DATETIME NULL;
UPDATE UploadsVideo
SET publishedAtTmp = STR_TO_DATE(publishedAt, '%Y-%m-%dT%H:%i:%sZ')
WHERE publishedAt IS NOT NULL AND publishedAt <> '';

-- Fallback parse for common alt formats (optional)
UPDATE UploadsVideo
SET publishedAtTmp = STR_TO_DATE(publishedAt, '%Y-%m-%d %H:%i:%s')
WHERE publishedAtTmp IS NULL AND publishedAt REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2} ';

-- Swap columns
ALTER TABLE UploadsVideo DROP COLUMN publishedAt;
ALTER TABLE UploadsVideo CHANGE COLUMN publishedAtTmp publishedAt DATETIME NULL;

-- Repoint Screenshots to videos
-- 1) add column if migration didn't (defensive)
ALTER TABLE Screenshot ADD COLUMN IF NOT EXISTS uploadsVideoId INT NULL;

UPDATE Screenshot s
JOIN Channel c ON c.externalId = s.ytChannelId AND c.provider = 'YOUTUBE'
JOIN UploadsVideo u ON u.ytId = s.ytVideoId AND u.channelId = c.id
SET s.uploadsVideoId = u.id;

-- Make relation mandatory + FK
ALTER TABLE Screenshot
  MODIFY uploadsVideoId INT NOT NULL,
  ADD CONSTRAINT fk_screenshot_video
    FOREIGN KEY (uploadsVideoId) REFERENCES UploadsVideo(id)
    ON DELETE CASCADE;

-- Drop legacy youtube columns
ALTER TABLE Screenshot
  DROP COLUMN ytChannelId,
  DROP COLUMN ytVideoId;
```

*(If Prisma generated different column names in the migration, adapt the SQL accordingly.)*

---

# Minimal code diffs (paste-ready)

## 1) Queue payloads & events → use `videoId`

```ts
// shared/types/events.ts
export enum ProcessEventType {
  DOWNLOAD_START = 'download_start',
  DOWNLOAD_PROGRESS = 'download_progress',
  DOWNLOAD_FINISH = 'download_finish',
  SCREENSHOTS_START = 'screenshots_start',
  SCREENSHOTS_PROGRESS = 'screenshots_progress',
  SCREENSHOTS_FINISH = 'screenshots_finish',
  THUMBNAILS_START = 'thumbnails_start',
  THUMBNAILS_FINISH = 'thumbnails_finish',
  STORYBOARD_CREATED = 'storyboard_created',
}

export type ProcessEventPayload = {
  type: ProcessEventType;
  videoId: number;           // canonical
  progress?: string;
};
```

```ts
// queues/types.ts
export type VideoJob = { videoId: number };
```

**Compatibility shim** (resolve old payloads in the API before enqueueing):

```ts
// queues/add-uploads.controller.ts (inside handler before enqueue)
if ('ytChannelId' in item || 'ytVideoId' in item) {
  const v = await prisma.uploadsVideo.findFirstOrThrow({
    where: { ytId: item.ytVideoId },
    select: { id: true },
  });
  jobs.push({ videoId: v.id });
} else if ('videoId' in item) {
  jobs.push({ videoId: item.videoId });
}
```

Emit events with `videoId` only:

```ts
this.events.emit<ProcessEventPayload>('processEvent', {
  type: ProcessEventType.SCREENSHOTS_PROGRESS,
  videoId,
  progress,
});
```

## 2) Local ingest endpoint

```ts
// videos/dtos/ingest-local.dto.ts
import { IsString } from 'class-validator';
export class IngestLocalDto {
  @IsString() title!: string;
  @IsString() filePath!: string; // absolute or base-relative
}
```

```ts
// videos/videos.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { IngestLocalDto } from './dtos/ingest-local.dto';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videos: VideosService) {}

  @Post('ingest-local')
  async ingestLocal(@Body() dto: IngestLocalDto) {
    const videoId = await this.videos.ingestLocal(dto);
    return { videoId };
  }
}
```

```ts
// videos/videos.service.ts
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

function sha256File(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash('sha256');
    const s = fs.createReadStream(path);
    s.on('error', reject);
    s.on('data', (d) => h.update(d));
    s.on('end', () => resolve(h.digest('hex')));
  });
}

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  async ingestLocal({ title, filePath }: { title: string; filePath: string }) {
    const externalId = await sha256File(filePath);

    // Upsert by (provider, externalId)
    const video = await this.prisma.uploadsVideo.upsert({
      where: { provider_externalId: { provider: 'LOCAL', externalId } },
      create: {
        provider: 'LOCAL',
        externalId,
        title,
        src: filePath,
        storageKey: 'temp', // will set after create (need id)
      },
      update: { title, src: filePath },
      select: { id: true },
    });

    await this.prisma.uploadsVideo.update({
      where: { id: video.id },
      data: { storageKey: `v_${video.id}` },
    });

    return video.id;
  }
}
```

> **Note**: Prisma needs a named unique for composite where. Add this to the model if Prisma didn’t generate it:
> `@@unique([provider, externalId], name: "provider_externalId")`

## 3) Filesystem path helper (switch off YT ids)

```ts
// core/files/media-path.service.ts
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaPathService {
  private base = process.env.FILE_PATH_MEDIA || process.env.FILE_PATH_YOUTUBE || '/data/media';

  videoRoot(storageKey: string) {
    return path.join(this.base, storageKey);
  }
  allScreenshots(storageKey: string) {
    return path.join(this.videoRoot(storageKey), 'all_screenshots');
  }
  savedScreenshots(storageKey: string) {
    return path.join(this.videoRoot(storageKey), 'saved_screenshots');
  }
  thumbnails(storageKey: string) {
    return path.join(this.videoRoot(storageKey), 'thumbnails');
  }
}
```

Update consumers (screenshots/thumbnails/storyboard) to accept `videoId`, query `storageKey` once, and use these helpers.

## 4) Services signatures (one-line changes)

* `ScreenshotsJobService.captureScreenshots({ videoId: number })`
* `ThumbnailsService.generateThumbnails({ videoId: number })`
* `StoryboardService.create({ videoId: number })`

First line inside each: fetch `storageKey` and any needed metadata:

```ts
const v = await prisma.uploadsVideo.findUniqueOrThrow({
  where: { id: videoId },
  select: { storageKey: true, src: true, provider: true },
});
```

---

# Dashboard & queries (what to change)

* Replace joins that used `Screenshot.ytChannelId/ytVideoId` with:

  ```
  Screenshot -> uploadsVideoId -> UploadsVideo.channelId
  ```
* Example: screenshots per channel

```ts
await prisma.screenshot.groupBy({
  by: ['uploadsVideoId'],
  _count: true,
});
// then join to videos and channels as needed, or group directly with a raw:
await prisma.$queryRaw`
  SELECT v.channelId, COUNT(*) AS cnt
  FROM Screenshot s
  JOIN UploadsVideo v ON v.id = s.uploadsVideoId
  WHERE v.channelId IS NOT NULL
  GROUP BY v.channelId
`;
```

* Allow `channelId IS NULL` to show LOCAL videos in a separate bucket if you want.

---

# HTTP compatibility (keep working while you migrate UI)

* Keep existing endpoints, but resolve incoming `(ytChannelId, ytVideoId)` to `videoId` at the edge, then internally pass `videoId` everywhere.
* New endpoint added: `POST /videos/ingest-local`.

---

# TODO checklist (short)

* [ ] Paste schema, run migration, run backfill SQL.
* [ ] Add `provider_externalId` named unique (if Prisma didn’t name it).
* [ ] Switch queue payloads & events to `{ videoId }`.
* [ ] Introduce `MediaPathService` and replace path usage.
* [ ] Update screenshots/thumbnails/storyboard services to start from `videoId`.
* [ ] Adjust dashboard queries to the new relations.
* [ ] Set `FILE_PATH_MEDIA` in env; keep old path var as fallback.

If you want, I can generate the exact Prisma migration files and the precise changes for your `ScreenshotsJobService` and `ThumbnailsService` once you show those files.
