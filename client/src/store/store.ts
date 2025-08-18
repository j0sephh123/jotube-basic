// store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// --- slice creators ---
import { thumbnailsProcessingSlice } from "@widgets/Thumbnails/model/thumbnails-processing-slice";
import { createDashboardSlice } from "@widgets/Dashboard/model/dashboard-slice";
import { createVideosDashboardSlice } from "@widgets/Dashboard/model/videos-dashboard-slice";
import {
  createSidePanelSlice,
  SidePanelSlice,
} from "@store/slices/side-panel-slice";
import { createPlaylistSlice, PlaylistSlice } from "@features/Playlist/store";
import { createRangePickersSlice } from "@widgets/Dashboard/model/range-picker-slice";
import { createVideosRangePickersSlice } from "@widgets/Dashboard/model/videos-range-picker-slice";
import { createSlidesSlice } from "@widgets/Thumbnails/model/slides-slice";
import { createStoryboardProcessingSlice } from "@store/slices/storyboard-processing-slice";
import { createZoomSlice } from "@store/slices/zoom-slice";

// ---- Types ----
import type {
  Store as StoreType,
  SlidesSlice,
  ThumbnailsProcessingSlice,
  StoryboardProcessingSlice,
  DashboardSlice,
  RangePickersSlice,
  VideosDashboardSlice,
  VideosRangePickersSlice,
  ZoomSlice,
} from "@store/store-types";

// ---- Store ----------------------------------------------------
export const useStore = create<StoreType>()(
  devtools(
    (set, get) => ({
      ...createSlidesSlice(set),
      ...thumbnailsProcessingSlice(set),
      ...createStoryboardProcessingSlice(set),
      ...createDashboardSlice(set),
      ...createVideosDashboardSlice(set),
      ...createRangePickersSlice(set, get),
      ...createVideosRangePickersSlice(set, get),
      ...createSidePanelSlice(set),
      ...createPlaylistSlice(set),
      ...createZoomSlice(set),
    }),
    { name: "store" }
  )
);

// ---- Slice-scoped hooks (single hook call, no equality) -------
function makeScopedHook<Slice>() {
  // 0 args -> whole slice; 1 arg -> selected value
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

// Per-slice hooks
export const useSlides = makeScopedHook<SlidesSlice>();
export const useThumbnailsSlice = makeScopedHook<ThumbnailsProcessingSlice>();
export const useStoryboardProcessing =
  makeScopedHook<StoryboardProcessingSlice>();
export const useDashboard = makeScopedHook<DashboardSlice>();
export const useVideosDashboard = makeScopedHook<VideosDashboardSlice>();
export const useRangePickers = makeScopedHook<RangePickersSlice>();
export const useVideosRangePickers = makeScopedHook<VideosRangePickersSlice>();
export const useSidePanel = makeScopedHook<SidePanelSlice>();
export const usePlaylist = makeScopedHook<PlaylistSlice>();
export const useZoom = makeScopedHook<ZoomSlice>();
