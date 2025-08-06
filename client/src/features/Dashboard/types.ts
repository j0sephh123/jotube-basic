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
  uploadsWithScreenshots: number;
  screenshotsCount: number;
};
