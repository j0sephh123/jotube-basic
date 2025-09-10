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
type DashboardVideos = `/dashboard/videos/all`;
type GalleryVideo = `/channels/${YtChannelId}/gallery/${YtVideoId}`;
type ViewTypeType = `/dashboard/channels/${ViewType}`;
type PlaylistUploads = `/playlists/${number}/uploads/${string}`;
type PlaylistUploadsDefault = `/playlists/${number}/uploads/default`;
type PlaylistUploadsSaved = `/playlists/${number}/uploads/saved`;
type ProcessingPhaseLatest = `/processing-phase/latest`;
type ProcessingPhaseRunning = `/processing-phase/running`;
type VideoDetails = `/channels/${YtChannelId}/videos/${YtVideoId}`;
type SingleChannelThumbnails = `/channels/${YtChannelId}/thumbnails`;
type SingleChannelScreenshots = `/channels/${YtChannelId}/screenshots`;
type RecentlyViewed = `/recently-viewed`;
type PlaylistThumbnails = `/playlists/${number}/thumbnails`;
type PlaylistGallery = `/playlists/${number}/gallery`;
type PlaylistStoryboards = `/playlists/${number}/storyboards`;
type PlaylistScreenshots = `/playlists/${number}/screenshots`;
type ChannelStoryboards = `/channels/${YtChannelId}/storyboards`;
type ChannelSaved = `/channels/${YtChannelId}/saved`;
type Tv = `/tv`;

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
  | ProcessingPhaseRunning
  | VideoDetails
  | SingleChannelThumbnails
  | SingleChannelScreenshots
  | RecentlyViewed
  | PlaylistThumbnails
  | PlaylistGallery
  | PlaylistStoryboards
  | PlaylistScreenshots
  | ChannelStoryboards
  | ChannelSaved
  | Tv;

export type UploadsType =
  | "default"
  | "saved"
  | "thumbnails"
  | "screenshots"
  | "gallery";

export function makeYtChannelId(s: string): YtChannelId {
  // TODO:
  // i've mixed other series which are actually not channels, so this won't work for now
  // until i find a better way to handle this
  // if (s.length !== 24 || s.includes("/"))
  //   throw new Error("Invalid YtChannelId");
  return s as YtChannelId;
}

export function makeYtVideoId(s: string): YtVideoId {
  // TODO Fix similar to makeYtChannelId
  // if (s.length !== 11 || s.includes("/")) throw new Error("Invalid YtVideoId");
  return s as YtVideoId;
}

export function isViewType(value: string): value is ViewType {
  return Object.values(ViewType).includes(value as ViewType);
}
