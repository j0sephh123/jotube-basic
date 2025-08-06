export enum ViewType {
  SAVED = 'saved',
  PROCESSED = 'processed',
  CHANNELS_WITHOUT_UPLOADS = 'no-uploads',
  CHANNELS_WITHOUT_SCREENSHOTS = 'no-screenshots',
  THUMBNAILS = 'thumbnails',
}

export interface ChannelWithUploads {
  id: number;
  createdAt: Date;
  title: string;
  ytId: string;
  src: string;
  lastSyncedAt: Date | null;
  videoCount: number;
  uploads: Array<{
    id: number;
    ytId: string;
    artifact: string;
  }>;
  screenshots: Array<{
    ytVideoId: string;
    second: number;
  }>;
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
  uploadsWithScreenshots: number;
  screenshotsCount: number;
  screenshots: Array<{
    ytVideoId: string;
    second: number;
  }>;
}

export interface DashboardChannelWithUploads extends DashboardChannel {
  uploads: Array<{
    id: number;
    ytId: string;
    artifact: string;
  }>;
}

export interface DashboardResponse {
  channels: DashboardChannel[];
  total: number;
}
