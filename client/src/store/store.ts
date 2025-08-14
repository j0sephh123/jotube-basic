// store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// --- slice creators ---
import { thumbnailsProcessingSlice } from "@/features/Thumbnail/store/thumbnails-processing-slice";
import { createWebSocketSlice } from "./slices/websocket-slice";
import { createDashboardSlice } from "@/features/Dashboard/store/dashboard-slice";
import { createVideosDashboardSlice } from "@/features/Dashboard/store/videos-dashboard-slice";
import {
  createSidePanelSlice,
  SidePanelSlice,
} from "./slices/side-panel-slice";
import { createPlaylistSlice, PlaylistSlice } from "@/features/Playlist/store";
import { createRangePickersSlice } from "@/features/Dashboard/store/range-picker-slice";
import { createVideosRangePickersSlice } from "@/features/Dashboard/store/videos-range-picker-slice";
import { createSlidesSlice } from "@/features/Thumbnail/store/slides-slice";
import { createStoryboardProcessingSlice } from "./slices/storyboard-processing-slice";
import { createZoomSlice } from "./slices/zoom-slice";

// ---- Types ----
import type {
  Store as StoreType,
  SlidesSlice,
  ThumbnailsProcessingSlice,
  StoryboardProcessingSlice,
  WebSocketSlice,
  DashboardSlice,
  RangePickersSlice,
  VideosDashboardSlice,
  VideosRangePickersSlice,
  ZoomSlice,
} from "./store-types";

// ---- Store ----------------------------------------------------
export const useStore = create<StoreType>()(
  devtools(
    (set, get) => ({
      ...createSlidesSlice(set),
      ...thumbnailsProcessingSlice(set),
      ...createStoryboardProcessingSlice(set),
      ...createWebSocketSlice(set),
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
export const useWebSocketState = makeScopedHook<WebSocketSlice>();
export const useDashboard = makeScopedHook<DashboardSlice>();
export const useVideosDashboard = makeScopedHook<VideosDashboardSlice>();
export const useRangePickers = makeScopedHook<RangePickersSlice>();
export const useVideosRangePickers = makeScopedHook<VideosRangePickersSlice>();
export const useSidePanel = makeScopedHook<SidePanelSlice>();
export const usePlaylist = makeScopedHook<PlaylistSlice>();
export const useZoom = makeScopedHook<ZoomSlice>();
