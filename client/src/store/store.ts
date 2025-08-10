import { create } from "zustand";
import { Store } from "./store-types";
import { devtools } from "zustand/middleware";
import { createWebSocketSlice } from "./slices/websocket-slice";
import { createDashboardSlice } from "../features/Dashboard/store/dashboard-slice";
import { createSlidesSlice } from "@/features/Thumbnail/store/slides-slice";
import { thumbnailsProcessingSlice } from "@/features/Thumbnail/store/thumbnails-processing-slice";
import { createRangePickersSlice } from "@/features/Dashboard/store/range-picker-slice";
import { createSidePanelSlice } from "./slices/side-panel-slice";

export const useStore = create<Store>()(
  devtools(
    (set, get) => ({
      ...createSlidesSlice(set),
      ...thumbnailsProcessingSlice(set),
      ...createWebSocketSlice(set),
      ...createDashboardSlice(set),
      ...createRangePickersSlice(set, get),
      ...createSidePanelSlice(set),
    }),
    {
      name: "store",
    }
  )
);
