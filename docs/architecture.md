## Backend Architecture

## Db schema
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["typedSql"]
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Channel {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  title String @unique @db.VarChar(255)
  ytId  String @unique @db.VarChar(24)
  src   String @unique @db.VarChar(255)

  videoCount Int

  fetchStartVideoId String    @db.VarChar(11)
  fetchedUntilEnd   Boolean   @default(false)
  lastSyncedAt      DateTime?

  uploads     UploadsVideo[]
  screenshots Screenshot[]
}

enum ArtifactType {
  VIDEO // default
  SAVED
  DOWNLOADED // not used, but will be used in the future
  STORYBOARD // not used, but will be used in the future
  THUMBNAIL
  SCREENSHOT
}

model UploadsVideo {
  id            Int          @id @default(autoincrement())
  ytId          String       @unique @db.VarChar(11)
  title         String
  src           String
  publishedAt   String
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  channelId     Int
  channel       Channel      @relation(fields: [channelId], references: [id], onDelete: Cascade)
  nextPageToken String?
  duration      Int?
  artifact      ArtifactType @default(VIDEO)

  thumbnail  Thumbnail?  @relation
  storyboard Storyboard? @relation

  @@index([channelId, artifact])
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

  second Int

  ytChannelId String
  channel     Channel @relation(fields: [ytChannelId], references: [ytId], onDelete: Cascade)

  ytVideoId String

  isFav Boolean?

  @@index([ytChannelId])
}
```

### Overview

- **Framework**: NestJS (Express adapter)
- **DB**: MySQL via Prisma
- **Queues**: Bull (Redis-backed) with bull-board admin
- **Realtime**: socket.io gateway for progress events
- **Docs**: Swagger at /api and Redoc at /docs
- **Static**: Image files served from FILE_PATH_YOUTUBE via /images and /uploads

### Core Modules

- **AppModule** wires all modules and queues: `images`, `channels`, `uploads-video`, `thumbnails`, `screenshots` (jobs + manager + api), `storyboard`, `dashboard`, `search`, `core/events`, `core/database`, `queues`.
- **Bull Queues** registered: `video`, `download`, `storyboard`.
- **Processors**: `DownloadProcessor`, `VideoProcessor`, `StoryboardProcessor`.
- **External services**: `YoutubeService` (YouTube Data API), `YouTubeDownloaderService` (bridge to download-service), `DownloadService` (orchestrates downloads and emits progress).
- **Filesystem services**: `FilePathService`, `DirectoryService`, `FileOperationService`.
- **Events**: `EventsService` + `EventsGateway` (socket.io) emitting process events to clients.

### Data Model (Prisma)

- `Channel`
  - Keys: `id`, `ytId` (unique), `title`, `src`, `videoCount`
  - Sync: `fetchStartVideoId`, `fetchedUntilEnd`, `lastSyncedAt`
- `UploadsVideo`
  - Keys: `id`, `ytId` (unique), `title`, `src`, `publishedAt`, `channelId`
  - Artifact state: `artifact` enum `VIDEO | SAVED | DOWNLOADED | STORYBOARD | THUMBNAIL | SCREENSHOT`
  - Relations: optional `thumbnail`, optional `storyboard`
- `Thumbnail`
  - `uploadsVideoId` (1-1 to `UploadsVideo`), `perRow`, `totalSeconds`
- `Storyboard`
  - `uploadsVideoId` (1-1), `fragments`, `url`
- `Screenshot`
  - `id`, `second`, `ytChannelId`, `ytVideoId`, `isFav` (nullable)

### Filesystem Layout

- Base path: `FILE_PATH_YOUTUBE`
- Per-upload folder: `{base}/{ytChannelId}/{ytVideoId}`
  - `all_screenshots/` raw frames
  - `saved_screenshots/` user-selected frames
  - `thumbnails/` generated collage images (`0.png`, `1.png`, ...)

### Realtime Events

- Event types: `download_start | download_progress | download_finish | screenshots_start | screenshots_progress | screenshots_finish | thumbnails_start | thumbnails_finish | storyboard_created`.
- Socket channel: server emits `processEvent` to all clients.
- Event payload: `{ type: EventTypes, ytVideoId: string, progress?: string }`.
- Rate limiting: `download_progress` and `screenshots_progress` throttled per-video to ~2s.

### Queues and Processors

- Queue names: `download`, `video`, `storyboard`.
- Job payloads:
  - Download/video pipeline: `{ ytChannelId: string, ytVideoId: string }`
  - Storyboard: `{ ytVideoId: string }`
- Flow: add-uploads → download → video → DB updates
  1. `queues/add-uploads` enqueues jobs to `download`.
  2. `DownloadProcessor` calls `DownloadService.download`, which:
     - POSTs to download-service `/add-to-queue`.
     - Polls `/queue` for the channel’s items, emits `download_progress`, then `download_finish` when the item disappears.
     - On finish, enqueues same payload to `video` queue.
  3. `VideoProcessor`:
     - Runs `ScreenshotsJobService.captureScreenshots({ ytChannelId, ytVideoId })`.
     - Runs `ThumbnailsService.generateThumbnails({ ytChannelId, ytVideoId })`.
     - Marks `UploadsVideo.artifact = THUMBNAIL` and creates a `Thumbnail` row.
  4. Optional: `queues/add-storyboard` enqueues to `storyboard`.
  5. `StoryboardProcessor` creates a `Storyboard` row via `StoryboardService` and emits `storyboard_created`.

### HTTP API Surface

- `POST /dashboard`

  - Body `fetchDashboardDto`: pagination, ranges, sort, viewType.
  - Returns `{ channels: DashboardChannel[], total: number }` with aggregated counts.

- `POST /search`

  - Body `{ search: string }`. Supports yt video id, channel id, or title substring.
  - Returns items typed as `ytVideoId | ytChannelId | channelTitle`.

- `POST /queues/add-uploads`

  - Body can be array of items or `{ items: AddVideosv2Dto[] }`.
  - Item: `{ downloadOption?: number, ytChannelId?: string, ytVideoIds?: string[] }`.
  - Channel mode enqueues first N saved uploads; video mode enqueues specific ids.

- `GET /queues/queue`

  - Returns active and waiting jobs in `download` and `storyboard` queues with enriched titles.

- `POST /queues/remove`

  - Body `{ jobIds: string[] }` removes jobs from `download` queue.

- `POST /queues/labels`

  - Body `{ items: { type: 'ytChannelId', id: string }[] }` → returns channel labels.

- `POST /queues/add-storyboard`

  - Body `{ data: { ytVideoId: string } }` → enqueues storyboard job.

- `POST /uploads-video/delete-uploads`

  - Body `{ ytChannelId: string, ytVideoIds: string[] }`. If empty, deletes all SAVED/DOWNLOADED for channel.

- `POST /uploads-video/finish-processing-upload`

  - Body `{ savedSeconds: number[], ytChannelId: string, ytVideoId: string }`.
  - If no `savedSeconds`: deletes the upload folder and DB row.
  - Else: copies selected frames to `saved_screenshots/`, deletes video + thumbnails, inserts `Screenshot` rows, sets artifact `SCREENSHOT`.

- `POST /uploads-video/save-upload`

  - Body `{ uploads: { ytVideoId: string }[] }` → marks uploads as `SAVED` and removes any existing storyboard rows.

- `POST /uploads-video/fetch-uploads`

  - Body `{ ytChannelId: string }` → imports all new non-Short uploads for the channel.

- `POST /uploads-video/sync-uploads`

  - Body `{ channelId: number, ytChannelId: string }` → fetches uploads since latest known video.

- `POST /uploads-video/clean-short-uploads`

  - Body `{ ytChannelId: string }` → deletes < 180s uploads.

- `POST /uploads-video/saved-uploads`

  - Body `{ ytChannelIds: string[] }` → returns saved/downloaded uploads grouped by channel.

- `GET /uploads-video/uploads-list/:ytChannelId?sortOrder=asc|desc` → latest 50 `VIDEO` artifacts.
- `GET /uploads-video/storyboards/:ytChannelId` → uploads with storyboard rows.

- `POST /thumbnails-api` → body `string[]` of ytChannelIds; returns slides (random screenshots) for given channels or all.
- `POST /thumbnails-api/uploadsWithThumbnails` → `{ channelIds: number[] }`.
- `GET /thumbnails-api/thumbnail-by-upload/:ytId`.
- `POST /thumbnails-api/thumbnails` → `{ order?: 'asc'|'desc', filterField?: 'publishedAt'|'totalSeconds' }`.
- `GET /thumbnails-api/getByYtVideoId/:ytVideoId`.
- `GET /thumbnails-api/channel/:ytChannelId/screenshots`.

- `POST /channel` → `{ ytVideoId: string }` auto-creates channel by video id.
- `DELETE /channel/:id`.
- `GET /channel/metadata/:ytChannelId` → counts per artifact and screenshots.

- `POST /open-directory` → `{ ytChannelId: string, ytVideoId?: string }` opens Nemo to folder on host.

- `GET /images/:filePath(*)` → serves files under base path.

### Screenshot & Thumbnail Generation

- `ScreenshotsJobService.captureScreenshots` produces PNG frames in `all_screenshots`.
- `ThumbnailsService.generateThumbnails` reads sorted frames, resizes to a grid (default 8x5), composites into 1900px-wide PNG pages under `thumbnails/`, and emits `thumbnails_*` events.
- `ScreenshotsManagerService.processScreenshotsForUpload` moves selected frames to `saved_screenshots` and deletes `all_screenshots`.

### Storyboard Generation

- `StoryboardService.getVideoInfo(ytVideoId)` shells `yt-dlp -j` and extracts storyboard fragments and URL (`sb1` stream).
- `StoryboardProcessor` creates a `Storyboard` row and marks upload artifact as `STORYBOARD`, then emits `storyboard_created`.

### Dashboard Aggregation

- `DashboardService.fetchDashboard` builds channel lists based on `viewType` and aggregates counts:
  - Uploads per artifact via groupBy
  - Screenshots count per channel via groupBy
  - Sorting and range filters applied server-side

### External Integrations

- **YouTube Data API** via `YoutubeService`

  - Fetches channel metadata, playlist uploads, filters out Shorts (< 180s)
  - Supports incremental sync from the latest known video

- **download-service** via `YouTubeDownloaderService`
  - `POST {DL_SERVICE_URL}/add-to-queue` with `{ ytChannelId, ytVideoId }`
  - `GET {DL_SERVICE_URL}/queue` returns array with `{ ytVideoId, status, progress, ... }` for polling

### Configuration

- `PORT`: server port (default 3003)
- `FILE_PATH_YOUTUBE`: base folder for channel/video files
- `PUBLIC_FOLDER`: public assets folder (used for static mounting)
- `DL_SERVICE_URL`: base URL for the external download service
- `YOUTUBE_API_KEY`: YouTube Data API key

### Admin & Docs

- Swagger UI: `/api`
- Redoc: `/docs` (spec at `/docs/swagger.json`)
- Bull-board: `/admin/queues`
- Static uploads: `/uploads` served from `{FILE_PATH_YOUTUBE}/Demo`

### Typical Flows

- Add videos to processing pipeline

  1. Call `POST /queues/add-uploads` with either `{ ytChannelId, downloadOption }` or `{ ytVideoIds: [...] }`.
  2. Watch socket `processEvent` for `download_*`, `screenshots_*`, `thumbnails_*` for each `ytVideoId`.
  3. After thumbnails, the upload will be marked as `THUMBNAIL` and discoverable via `thumbnails-api`.

- Save selected screenshots and finalize an upload

  1. Call `POST /uploads-video/finish-processing-upload` with `savedSeconds`.
  2. Service moves frames to `saved_screenshots`, cleans video + thumbnails, writes `Screenshot` rows, sets artifact `SCREENSHOT`.

- Create storyboard for a video
  1. Call `POST /queues/add-storyboard` with `{ data: { ytVideoId } }`.
  2. On completion, `storyboard_created` is emitted and `UploadsVideo` artifact becomes `STORYBOARD`.

### Notes for Consumers

- Image URLs follow: `http://{host}:{PORT}/images/{ytChannelId}/{ytVideoId}/saved_screenshots/{ytVideoId}-{second}.png`.
- `thumbnails-api` returns slides compatible with the client gallery components.
- Socket events are global; client should filter by `ytVideoId`.

