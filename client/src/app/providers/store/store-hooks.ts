import { type PlaylistSlice } from "@features/Playlist";
import { useStore } from "./store-root";

import type {
  CarouselScreenshotsSlice,
  ThumbnailsProcessingSlice,
  DashboardSlice,
  VideosDashboardSlice,
  VideoModalSlice,
  GalleryModalSlice,
  StoryboardProcessingSlice,
  ZoomSlice,
} from "./store-types";

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

export const usePlaylist = makeScopedHook<PlaylistSlice>();
export const useVideoModal = makeScopedHook<VideoModalSlice>();
export const useStoryboardProcessing =
  makeScopedHook<StoryboardProcessingSlice>();
export const useGalleryModal = makeScopedHook<GalleryModalSlice>();
export const useZoom = makeScopedHook<ZoomSlice>();
