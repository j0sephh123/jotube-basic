# JoTube

## Table of Contents

- [Summary](#summary)
- [Simple Flow Demo](#simple-flow-demo)
- [User Workflow](#user-workflow)
- [Technical Pipeline](#technical-pipeline)
- [Database Structure](#database-structure)
- [Architecture Overview](#architecture-overview)
- [Installation & Setup](#installation--setup)

## Summary

JoTube is a local tool for rapid, manual screenshot extraction and organization from YouTube videos. This demo repository implements the core workflow for channel discovery, video processing, and screenshot management.

**Key Features:**

- **Channel Management**: Add YouTube channels by video ID and fetch channel metadata
- **Video Processing**: Download videos and extract screenshots at regular intervals
- **Screenshot Organization**: View and manage screenshots by channel, date, or month
- **Gallery Interface**: Browse screenshots with zoom capabilities and direct YouTube video linking

## Simple Flow Demo

![Simple Flow Demo](simple_flow.gif)

_Demo: Adding a channel, processing videos, and extracting screenshots using JoTube._

## User Workflow

1. **Add Channel**: Enter a YouTube video ID to create a channel and fetch its metadata
2. **Fetch Uploads**: Retrieve video metadata from the channel (processed in batches of 50)
3. **Sync Updates**: Get new videos when channels have new uploads
4. **Select Videos**: Save or delete videos for processing
5. **Process Videos**: Download videos and extract screenshots at regular intervals
6. **Review Screenshots**: View composite thumbnails and select desired screenshots
7. **Manage Gallery**: Browse, favorite, and delete screenshots with direct YouTube video linking

## Architecture Overview

### Tech Stack

**Frontend**: React + Vite (TypeScript), Zustand + Context, TanStack Query, Tailwind CSS + DaisyUI

**Backend**: NestJS, BullMQ, Prisma ORM, Sharp

**Download Service**: Python wrapper around yt-dlp

### System Components

**Database**: Prisma ORM with MySQL

**Core Services**:

- YouTube API integration for channel and video metadata
- Download service for video processing
- Server-sent events for real-time updates

**API Modules**: Channels, Dashboard, File operations, Images, Queue management, Screenshots, Thumbnails, Uploads

**Client**: Modular feature-based React application with separate modules for Channel, Dashboard, and Thumbnail management

### Data Flow

1. **Video Processing**: yt-dlp downloads videos → ffmpeg extracts screenshots → Sharp generates composite thumbnails
2. **Storage**: Organized local file structure with channel/video hierarchy
3. **User Interface**: React components with Zustand state management and TanStack Query for data fetching

### File Organization

```
{root_folder}/{channel_id}/{video_id}/
├── all_screenshots/{video_id}-{second}.png
├── saved_screenshots/{video_id}-{second}.png
├── {video_id}.mp4
└── thumbnails/{video_id}-{index}.png
```

## Database Structure

| Entity         | Key Fields                                 | Relationships                          |
| -------------- | ------------------------------------------ | -------------------------------------- |
| **Channel**    | `title`, `ytId`, `videoCount`              | Has many uploads, has many screenshots |
| **Video**      | `ytId`, `title`, `publishedAt`, `artifact` | Belongs to channel, has one thumbnail  |
| **Thumbnail**  | `perRow`, `totalSeconds`                   | Belongs to upload                      |
| **Screenshot** | `second`, `isFav`                          | Associated with channel and video IDs  |

_Note: `artifact` field tracks video processing status (e.g., "DOWNLOADED", "THUMBNAIL_GENERATED", "SCREENSHOT_CAPTURED")_

## Installation & Setup

### Prerequisites

- Node.js 18+
- Python 3.8+
- MySQL database
- YouTube Data API key

### Environment Configuration

**Server** (`server/.env`):

```

DATABASE_URL="mysql://username:password@localhost:3306/database_name"
YOUTUBE_API_KEY="your_youtube_api_key"
PORT=3003
FILE_PATH_YOUTUBE="/path/to/screenshots/folder"
PUBLIC_FOLDER="http://localhost:3003/images/"
DL_SERVICE_URL="http://localhost:8081"

```

**Download Service** (`download-service/.env`):

```

YOUTUBE_DIR="/path/to/screenshots/folder"

```

### Installation Steps

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd jotube
   pnpm install
   cd server && pnpm install
   cd ../download-service && pip install -r requirements.txt
   ```

2. **Configure database**:

   ```bash
   cd server
   npx prisma db push

3. **Set up Python virtual environment**:

   ```bash
   cd download-service
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Start services**:

   ```bash
   # Terminal 1: Backend server
   cd server && pnpm start:dev

   # Terminal 2: Download service
   cd download-service && python main.py

   # Terminal 3: Frontend
   cd client && pnpm dev
   ```

### Troubleshooting

- **Port conflicts**: Update the `PORT` variable in `server/.env` if port 3003 is already in use
- **Database connection**: Ensure MySQL is running and the database exists
- **Python dependencies**: Make sure the virtual environment is activated before running the download service

### Demo Limitations

This simplified demo version includes:

- Basic channel management and video processing
- Screenshot extraction and thumbnail generation
- Gallery viewing and screenshot management
