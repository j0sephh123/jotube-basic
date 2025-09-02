/* eslint-disable boundaries/element-types */
import { ViewType } from "@features/Dashboard";

type Brand<K extends string> = string & { readonly __brand: K };

type YtChannelId = Brand<"YtChannelId">;
type YtVideoId = Brand<"YtVideoId">;

type Playlists = `/playlists`;
type SinglePlaylist = `/playlists/${number}`;
type SingleChannelSaved = `/channels/${YtChannelId}/saved`;
type DashboardSaved = `/dashboard/channels/saved`;
type Index = `/channels/${YtChannelId}`;
type Gallery = `/channels/${YtChannelId}/gallery`;
type Home = `/`;
type ImageNavigator = `/image-navigator`;
type Thumbnails = `/thumbnails`;
type DashboardThumbnails = `/dashboard/channels/thumbnails`;
type SingleChannelUploads = `/channels/${YtChannelId}`;
type DashboardVideos = `/dashboard/videos`;
type GalleryVideo = `/channels/${YtChannelId}/gallery/${YtVideoId}`;
type ViewTypeType = `/dashboard/channels/${ViewType}`;
type PlaylistUploads = `/playlists/${number}/uploads/${string}`;
type PlaylistUploadsDefault = `/playlists/${number}/uploads/default`;
type PlaylistUploadsSaved = `/playlists/${number}/uploads/saved`;
type ProcessingPhaseLatest = `/processing-phase/latest`;
type ProcessingPhaseRunning = `/processing-phase/running`;

export type To =
  | Playlists
  | SinglePlaylist
  | SingleChannelSaved
  | DashboardSaved
  | Index
  | Gallery
  | Home
  | ImageNavigator
  | Thumbnails
  | DashboardThumbnails
  | SingleChannelUploads
  | DashboardVideos
  | GalleryVideo
  | ViewTypeType
  | PlaylistUploads
  | PlaylistUploadsDefault
  | PlaylistUploadsSaved
  | ProcessingPhaseLatest
  | ProcessingPhaseRunning;

export function makeYtChannelId(s: string): YtChannelId {
  if (s.length !== 24 || s.includes("/"))
    throw new Error("Invalid YtChannelId");
  return s as YtChannelId;
}

export function makeYtVideoId(s: string): YtVideoId {
  if (s.length !== 11 || s.includes("/")) throw new Error("Invalid YtVideoId");
  return s as YtVideoId;
}

export function isViewType(value: string): value is ViewType {
  return Object.values(ViewType).includes(value as ViewType);
}
