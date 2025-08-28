/* eslint-disable import/no-internal-modules */
import type { PlaylistSlice } from "@features/Playlist";
import type { SortOrder } from "@shared/api";
import type { GalleryModalSlice } from "@features/Gallery/model";
import type { VideoModalSlice } from "../../../features/Upload/model/video-modal-slice";
import type { CarouselScreenshotsSlice } from "@features/Screenshot/model";
import type { ThumbnailsProcessingSlice } from "@features/Thumbnails/model";
import type { ZoomSlice } from "@features/Screenshot/model";

export type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

export type StoryboardProcessingSlice = {
  storyboardProcessingData: Array<{
    ytChannelId: string;
    uploads: Array<{
      id: number;
      ytId: string;
      title: string;
      src: string;
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
      channelId: number;
      nextPageToken: string | null;
      duration: number | null;
      artifact: string;
      storyboard: {
        id: number;
        uploadsVideoId: number;
        fragments: number;
        url: string;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  }>;
  setStoryboardProcessingData: (
    data: StoryboardProcessingSlice["storyboardProcessingData"]
  ) => void;
  clearStoryboardProcessingData: () => void;
};

export type VideosDashboardSlice = {
  videosRequestBody: {
    sortOrder: SortOrder;
    page: number;
  };
  setVideosRequestBody: <
    K extends keyof {
      sortOrder: SortOrder;
      page: number;
    }
  >(
    key: K,
    value: {
      sortOrder: SortOrder;
      page: number;
    }[K]
  ) => void;
};

export type Store = CarouselScreenshotsSlice &
  ThumbnailsProcessingSlice &
  StoryboardProcessingSlice &
  VideosDashboardSlice &
  PlaylistSlice &
  ZoomSlice &
  VideoModalSlice &
  GalleryModalSlice;
