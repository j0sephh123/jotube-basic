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