# JoTube

## Table of Contents

- [Summary][#summary]
- [Quick note](#quick-note)
- [History](#history)
- [How it works quick explanation](#how-it-works-quick-explanation)
- [Db structure explained](#db-structure-explained)
- [Tech Stack](#tech-stack)
  - [Front end (client)](#front-end-client)
  - [Back end (server)](#back-end-server)
  - [Download-service (python)](#download-service-python)
- [Server folder structure explanation](#server-folder-structure-explanation)
  - [Core](#core)
  - [Modules](#modules)
- [How files are kept locally](#how-files-are-kept-locally)
- [Running locally](#running-locally)

## Summary

JoTube is a YouTube video management and screenshot extraction platform that enables users to organize, process, and analyze YouTube content at scale. The application provides a complete workflow from channel discovery to screenshot extraction and management.

Tried to record a [video](https://streamable.com/oohprz), but my presenting skills are not the best, but you should be able to get a general idea how it works. Note that the playlist that you see in prisma is actually a leftover and here it is deleted.

**Core Features:**

- **Channel Management**: Add YouTube channels by video ID, automatically fetch channel metadata and uploads using YouTube Data API
- **Video Processing Pipeline**: Download videos using yt-dlp, extract screenshots with ffmpeg, and generate composite thumbnails
- **Screenshot Extraction**: Automatically capture screenshots at regular intervals throughout videos, with user-selectable frames
- **Gallery & Organization**: View screenshots by channel, date, or month with favorites and deletion capabilities

## Quick note

What you see in this repo is a simplified version with only the basic functionality for the purposes of reviewing the code.

## History

I've been working on typical CRUD style applications for managing YouTube videos for many years. However my interests have evolved with time and so have the applications. Initially I just wanted to manage videos along with channels and playlists, maybe take notes and capture progress. Now I'm trying to create a platform that will enable the users to view, extract and analyse many images quickly.  
**Note**: what you see is a part of my original application. I have omitted many functionalities since it would make it very hard to review. Tried to keep only very basic stuff - how you go from adding a channel to the application to extracting screenshots from a video.

## How it works quick explanation

1. Creating a channel
   A YouTube video usually has this structure `https://www.youtube.com/watch?v=fXyRprdoEoE` or if you click share you get this structure `https://youtu.be/fXyRprdoEoE?si=bZEASMDyg9qdV_OG`. In both cases there is this segment which is always 11 characters long `fXyRprdoEoE`, which is the id. This application is using several endpoints from YouTube Data API (https://developers.google.com/youtube/v3/docs/channels/list). When the user creates a video, we first fetch the related channel id and then the info for the channel. The reason is that it is harder to obtain the channel id and also usually a user is watching a video and the quickest way is to copy the id of the video. This creates channel without the related uploads. They are explicitly fetched by the user upon clicking a button, because some channels have a lot of uploads and youtube api has a limit of 50 per req and there is a daily quota. Before that I was having a functionality to fetch only until a certain video so it can be resumed, but in this implementation this is missing.

2. Fetching uploads for a channel
   Gets all uploads for the channel and saves them to the db. `fetchUploadsForChannel` It does so in batches of 50 (limited by youtube api)

3. Syncing uploads
   When the channel has newer uploads, which we don't have yet in the db, the user can call `syncUploads` to get the latest. Before I was using a background job for that, but I felt that it ruins the UX.
4. Picking videos for processing
   The users can either save or delete a video

5. Processing videos 3 phases

- 1. Download: Python service and ytdlp
- 2. Capture Screenshots: ffmpeg as a child process
- 3. Generate composite image from screenshots, for example 40 images in one video: sharp
     more technical details below

6. Picking screenshots
   The users can view the so called thumbnails in a viewer and pick the ones that they want. There is a simple grid above the thumbnail where the user can either zoom on an image, which gets the original one with highest quality or select it
   When the users Submit, only the selected screenshots are saved and the rest is deleted.

7. Viewing screenshots
   The users can view all, only for a channel or have a gallery where they can make a screenshot a favorite or delete. Additionally when clicking on a screenshot, an iframe opens to start the video from youtube from a specific second.

## Db structure explained

- Channel

  - `title`, `ytId`, `src`, `videoCount`: populated from youtube api
  - `fefetchedUntilEnd`: indicating whether we have all the uploads for the channel
  - `lastSyncedAt` and `fetchStartVideoId` are indicators for fetching new videos. lastSyncedAt shows when was the last time we did a refetch. `fetchStartVideoId` is the newest video that we have. I used to have this done in the background, but this is not good for UX. How it works is we start fetching from the latest video until we hit `fetchStartVideoId`. Since the batch is 50, we are creating a loop in order to do that until we reach `fetchStartVideoId`
  - `uploads` relation: a channel has many uploads
  - `screenshots` relation: a channel has many screenshots

- UploadsVideo
  - `ytId`, `title`, `src`, `publishedAt`: populated from youtube api
  - `channel` relation
  - `thumbnail` relation
  - `status` (legacy): before that i was using status to capture the 3 possible states.
    - 0: when the upload is added to the channel but no actions have been applied
    - 1: this would include saved, downloaded and also ones with thumbnails.
    - 2: when it has screenshots captured
  - `artifact`: this captures more more accurately the possible states of an upload
    - VIDEO: initial state after fetched from youtube and added to the db
    - SAVED: when the video has been saved
    - DOWNLOADED: when the video has been downloaded
    - THUMBNAIL: when thumbnails are generated
    - SCREENSHOT: when screenshots are captured
      Note that not all states artifacts are used in this implementation since it is a simplified one
- `Thumbnail`
  - relation to UploadsVideo
  - `perRow` - right now it is hard coded
  - `totalSeconds` - the duration of the video in seconds, which corresponds to how many thumbnails, we need to generate. Right now one thumbnails has 40 images, so if the video is 100 seconds, we would have 3 thumbnails
- `Screenshot`
  - second - locally it gets saved as `{youtube_video_id}-{second}.png`
  - isFav: it has limited purpose in this implementation
  - relation to `ytChannelId` and
  - `ytVideoId` - not a relation

## Tech Stack

### Front end (client)

- vite setup with typescript and react
- **styling** - tailwind (daisyui)
- **store** - zustand and context
- **api caching** - tanstack-query  
  The rest are small libs

### Back end (server)

- NestJS
- bullmq - https://bullmq.io/. I was pessimistic at first, but it deserves to stay.
- Prisma ORM. Will probably get rid of it at some point and start using raw SQL to improve my knowledge, but few years ago I chose it for typescript support
- Sharp - generate thumbnails

### Download-service (python)

- a thin wrapper around `ytdlp` - ignore the implementation for the purposes of the interview

## Server folder structure explanation

I'm going to mention only the relevant ones

### Core

```

├── database
│   └── very simple prisma service
├── external-services
│   ├── youtube-downloader
│   │   └── calls download-service, which is a separate python package,
│   │       which on its hand uses ytdlp to dl youtube videos. The code
│   │       is not relevant
│   └── youtube-api
│       └── uses youtube data api to obtain data about channels and uploads
│           the code there is very old
└── events
└── A way to send events from the server to the UI. It is very rudimentary
implementation now with Server side events. I have used web sockets and
RabbitMQ before. I will probably do a revamp at some point and I guess
it will be RabbitMQ again

```

### Modules

```

├── channels
│   ├── POST /channel - create channel
│   ├── DELETE /channel/:id - delete channel
│   └── GET /channel/metadata/:ytChannelId - get channel metadata
├── dashboard
│   ├── POST /dashboard - fetch dashboard data. Very ineffecient offset pagination. Will be rewritten
│   ├── POST /dashboard/count - get dashboard count
│   ├── GET /dashboard/channels-without-screenshots - get channels without screenshots. This is because right now they appear in a separate page. Will be merged with dashboard at some point.
│   └── GET /dashboard/channels-without-uploads - get channels without uploads. This is because right now they appear in a separate page. Will be merged with dashboard at some point.
├── file
│   └── POST /open-directory - open directory in file manager
├── images
│   └── GET /images/:filePath - serve image files
├── queue
│   ├── POST /queues/add-uploads - add videos to queue
│   ├── GET /queues/queue - get screenshots queue
│   ├── POST /queues/remove - remove from video queue
│   └── POST /queues/labels - get labels. This is a nonsense, please ignore it :)
├── screenshots
│   ├── GET /screenshots-api/screenshots - get all screenshots. They are fed into the carousel. What you see is a library. I actually did a plugin architecture, I have my own as well, but not showing here for simplicity. Need to implement pagination to avoid over-fetching
├── shared
│   └── GET /sse/updates - server-sent events endpoint
├── thumbnails
│   ├── POST /thumbnails-api - get slides
│   ├── GET /thumbnails-api/grouped-thumbnails - get grouped thumbnails
│   ├── POST /thumbnails-api/uploadsWithThumbnails - get uploads with thumbnails
│   ├── GET /thumbnails-api/thumbnail-by-upload/:ytId - get thumbnail by upload
│   ├── POST /thumbnails-api/thumbnails - get thumbnails
│   ├── GET /thumbnails-api/getByYtVideoId/:ytVideoId - get by video ID
│   └── GET /thumbnails-api/channel/:ytChannelId/screenshots - get channel screenshots
├── uploads-video
│   ├── POST /uploads-video/delete-uploads - delete uploads
│   ├── POST /uploads-video/finish-processing-upload - finish processing upload
│   ├── POST /uploads-video/save-upload - save upload
│   ├── POST /uploads-video/fetch-uploads - fetch uploads
│   ├── POST /uploads-video/sync-uploads - sync uploads
│   ├── POST /uploads-video/saved-uploads - get saved uploads
│   └── GET /uploads-video/uploads-list/:ytChannelId - get uploads list
└── video-worker

```

## How files are kept locally

- `{root_folder}/{youtube_channel_id}/{youtube_video_id}/all_screenshots/{youtube_video_id}-{second}.png`
- `{root_folder}/{youtube_channel_id}/{youtube_video_id}/saved_screenshots/{youtube_video_id}-{second}.png`
- `{root_folder}/{youtube_channel_id}/{youtube_video_id}/{youtube_video_id}.mp4`
- `{root_folder}/{youtube_channel_id}/{youtube_video_id}/thumbnails/{youtube_video_id}-{index}.png`

## Running locally

Right now there are 2 env files  
`server/.env`

```

DATABASE_URL="mysql://your_user:your_password@localhost:3306/db_name" or something completely different
YOUTUBE_API_KEY=this is obtained from google [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started)
PORT=3003 or some other one
FILE_PATH_YOUTUBE=a local folder on your computer where you are going to store the screenshots
PUBLIC_FOLDER="[http://localhost:3003/images/](http://localhost:3003/images/)" - what does the front end need to call to get images
DL_SERVICE_URL="[http://localhost:8081](http://localhost:8081)" - the address of download-service

```

`download-service/.env`

```

YOUTUBE_DIR=same as FILE_PATH_YOUTUBE. Obviously unnecessary duplication and will be resolved at some point

```
