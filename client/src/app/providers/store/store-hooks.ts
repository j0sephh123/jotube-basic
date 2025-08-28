/* eslint-disable import/no-internal-modules */
import { type PlaylistSlice } from "@features/Playlist";
import { useStore } from "./store-root";
import type { GalleryModalSlice } from "@features/Gallery/model";
import type {
  DashboardSlice,
  VideosDashboardSlice,
  StoryboardProcessingSlice,
  Store,
} from "./store-types";
import type { ThumbnailsProcessingSlice } from "@features/Thumbnails/model";
import type { CarouselScreenshotsSlice } from "@features/Screenshot/model";
import type { VideoModalSlice } from "@features/Upload/model/video-modal-slice";
import type { ZoomSlice } from "@features/Screenshot/model";
import { makeScopedHook } from "@shared/lib";

export const useCarouselScreenshots = makeScopedHook<
  Store,
  CarouselScreenshotsSlice
>(useStore, (store: Store) => store);

export const useThumbnailsSlice = makeScopedHook<
  Store,
  ThumbnailsProcessingSlice
>(useStore, (store: Store) => store);

export const useDashboard = makeScopedHook<Store, DashboardSlice>(
  useStore,
  (store: Store) => store
);

export const useVideosDashboard = makeScopedHook<Store, VideosDashboardSlice>(
  useStore,
  (store: Store) => store
);

export const useDashboardStore = () => {
  const dashboard = useDashboard();
  return {
    requestBody: dashboard.requestBody,
    setRequestBody: dashboard.setRequestBody,
  };
};

export const useVideosDashboardStore = () => {
  const videosDashboard = useVideosDashboard();
  return {
    videosRequestBody: videosDashboard.videosRequestBody,
    setVideosRequestBody: videosDashboard.setVideosRequestBody,
  };
};

export const usePlaylist = makeScopedHook<Store, PlaylistSlice>(
  useStore,
  (store: Store) => store
);

export const useVideoModal = makeScopedHook<Store, VideoModalSlice>(
  useStore,
  (store: Store) => store
);

export const useStoryboardProcessing = makeScopedHook<
  Store,
  StoryboardProcessingSlice
>(useStore, (store: Store) => store);

export const useGalleryModal = makeScopedHook<Store, GalleryModalSlice>(
  useStore,
  (store: Store) => store
);

export const useZoom = makeScopedHook<Store, ZoomSlice>(
  useStore,
  (store: Store) => store
);
