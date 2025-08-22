// client/src/app/providers/store/store-root.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createSlidesSlice } from "@/features/Thumbnails/model/slides-slice";
import { thumbnailsProcessingSlice } from "@/features/Thumbnails/model/thumbnails-processing-slice";
import { createStoryboardProcessingSlice } from "@/features/Storyboard/model/storyboard-processing-slice";
import { createDashboardSlice } from "@/features/Dashboard/model/dashboard-slice";
import { createVideosDashboardSlice } from "@/features/Dashboard/model/videos-dashboard-slice";
import { createRangePickersSlice } from "@/features/Dashboard/model/range-picker-slice";
import { createVideosRangePickersSlice } from "@/features/Dashboard/model/videos-range-picker-slice";
import { createSidePanelSlice } from "@/widgets/SidePanel/model/side-panel-slice";
import { createPlaylistSlice } from "@/features/Playlist/model/playlist-slice";
import { createZoomSlice } from "@/shared/model/zoom-slice";

import type { Store as StoreType } from "./store-types";

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
