import { ArtifactType } from '@prisma/client';

export enum ViewType {
  SAVED = 'saved',
  PROCESSED = 'processed',
  NO_UPLOADS = 'no-uploads',
  NO_SCREENSHOTS = 'no-screenshots',
  THUMBNAILS = 'thumbnails',
  HAS_STORYBOARDS = 'has-storyboards',
}

export interface ChannelWithUploads {
  id: number;
  createdAt: Date;
  title: string;
  ytId: string;
  src: string;
  lastSyncedAt: Date | null;
  videoCount: number;
}

export interface DashboardChannel {
  id: number;
  createdAt: Date;
  title: string;
  ytId: string;
  src: string;
  lastSyncedAt: Date | null;
  videoCount: number;
  thumbnails: number;
  saved: number;
  defaults: number;
  storyboard: number;
  screenshotsCount: number;
  playlist: {
    id: number;
    name: string;
  } | null;
}

export interface DashboardChannelWithUploads extends DashboardChannel {
  uploads: Array<{
    id: number;
    ytId: string;
    artifact: ArtifactType;
  }>;
}

export interface ChannelsDashboardResponse {
  channels: DashboardChannel[];
  total: number;
}

export interface DashboardVideo {
  id: number;
  ytId: string;
  title: string;
  src: string;
  channelId: number;
  channelTitle: string;
  channelYtId: string;
  screenshotCount: number;
  featuredScreenshots: Array<{
    id: number;
    second: number;
    ytVideoId: string;
    src: string;
  }>;
}

export interface VideosDashboardResponse {
  videos: DashboardVideo[];
  total: number;
}
