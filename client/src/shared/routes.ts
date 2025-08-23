import type { ViewType } from "@shared/api";

export const routes = {
  home: () => "/",
  config: () => "/config",
  dashboard: (viewType: ViewType) => `/dashboard/channels/${viewType}`,
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
  storyboard: (ytChannelId: string) => `/channels/${ytChannelId}/storyboard`,
  videos: () => "/dashboard/videos",
  playlists: () => "/playlists",
  playlist: (id: number) => `/playlists/${id}`,
  imageNavigator: () => "/image-navigator",
};
