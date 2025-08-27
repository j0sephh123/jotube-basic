import { type PlaylistSlice } from "@features/Playlist";
import { useStore } from "./store-root";

import type {
  SlidesSlice,
  ThumbnailsProcessingSlice,
  DashboardSlice,
  VideosDashboardSlice,
  RangePickersSlice,
  VideosRangePickersSlice,
  VideoModalSlice,
  GalleryModalSlice,
  StoryboardProcessingSlice,
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

export const useSlides = makeScopedHook<SlidesSlice>();
export const useThumbnailsSlice = makeScopedHook<ThumbnailsProcessingSlice>();
export const useDashboard = makeScopedHook<DashboardSlice>();
export const useVideosDashboard = makeScopedHook<VideosDashboardSlice>();
export const useRangePickers = makeScopedHook<RangePickersSlice>();
export const useVideosRangePickers = makeScopedHook<VideosRangePickersSlice>();
export const usePlaylist = makeScopedHook<PlaylistSlice>();
export const useVideoModal = makeScopedHook<VideoModalSlice>();
export const useStoryboardProcessing =
  makeScopedHook<StoryboardProcessingSlice>();
export const useGalleryModal = makeScopedHook<GalleryModalSlice>();
