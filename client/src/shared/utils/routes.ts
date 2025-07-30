export const routes = {
  home: () => "/",
  config: () => "/config",
  dashboard: (viewType: string) => `/dashboard/${viewType}`,
  channel: (ytChannelId: string) => `/channels/${ytChannelId}`,
  savedChannel: (ytChannelId: string) => `/channels/${ytChannelId}/saved`,
  gallery: (ytChannelId: string) => `/channels/${ytChannelId}/gallery`,
  galleryVideo: (ytChannelId: string, ytVideoId: string) =>
    `/channels/${ytChannelId}/gallery/${ytVideoId}`,
  screenshots: (ytChannelId: string) => `/channels/${ytChannelId}/screenshots`,
  screenshotsDate: (ytChannelId: string, date: string) =>
    `/channels/${ytChannelId}/screenshots/${date}`,
  thumbnails: () => `/thumbnails`,
  uploads: (ytChannelId: string) => `/channels/${ytChannelId}/uploads`,
};
