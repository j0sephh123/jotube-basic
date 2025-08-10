export type DashboardChannel = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  createdAt: string;
  lastSyncedAt: string | null;
  videoCount: number;
  thumbnails: number;
  saved: number;
  defaults: number;
  screenshotsCount: number;
  storyboard: number;
};

export interface DashboardVideo {
  id: number;
  ytId: string;
  title: string;
  src: string;
  channelId: number;
  channelTitle: string;
  channelYtId: string;
  screenshotCount: number;
}

export interface VideosDashboardResponse {
  videos: DashboardVideo[];
  total: number;
}
