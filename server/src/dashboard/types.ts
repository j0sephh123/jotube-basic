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
