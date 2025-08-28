/* eslint-disable import/no-internal-modules */
import { type PlaylistSlice } from "@features/Playlist";
import { useStore } from "./store-root";
import type { GalleryModalSlice } from "@features/Gallery/model";
import type {
  DashboardSlice,
  VideosDashboardSlice,
  StoryboardProcessingSlice,
} from "./store-types";
import type { ThumbnailsProcessingSlice } from "@features/Thumbnails/model";
import type { CarouselScreenshotsSlice } from "@features/Screenshot/model";
import type { VideoModalSlice } from "@features/Upload/model/video-modal-slice";
import type { ZoomSlice } from "@features/Screenshot/model";

function makeScopedHook<Slice>() {
  function useScoped(): Slice;
  function useScoped<T>(selector: (s: Slice) => T): T;
  function useScoped<T>(selector?: (s: Slice) => T): T | Slice {
    const sel = (selector ?? ((s: Slice) => s as unknown as T)) as (
      s: Slice
    ) => T;
    return useStore((s) => sel(s as unknown as Slice));
  }
  return useScoped;
}

export const useCarouselScreenshots =
  makeScopedHook<CarouselScreenshotsSlice>();
export const useThumbnailsSlice = makeScopedHook<ThumbnailsProcessingSlice>();
export const useDashboard = makeScopedHook<DashboardSlice>();
export const useVideosDashboard = makeScopedHook<VideosDashboardSlice>();

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

export const usePlaylist = makeScopedHook<PlaylistSlice>();
export const useVideoModal = makeScopedHook<VideoModalSlice>();
export const useStoryboardProcessing =
  makeScopedHook<StoryboardProcessingSlice>();
export const useGalleryModal = makeScopedHook<GalleryModalSlice>();
export const useZoom = makeScopedHook<ZoomSlice>();
