import { create } from "zustand";
import { Store } from "./store-types";
import { devtools } from "zustand/middleware";
import { createSSESlice } from "./slices/sse-slice";
import { createDashboardSlice } from "../features/Dashboard/store/dashboard-slice";
import { createSlidesSlice } from "@/features/Thumbnail/store/slides-slice";
import { thumbnailsProcessingSlice } from "@/features/Thumbnail/store/thumbnails-processing-slice";
import { createRangePickersSlice } from "@/features/Dashboard/store/range-picker-slice";

export const useStore = create<Store>()(
  devtools(
    (set, get) => ({
      ...createSlidesSlice(set),
      ...thumbnailsProcessingSlice(set),
      ...createSSESlice(set),
      ...createDashboardSlice(set),
      ...createRangePickersSlice(set, get),
    }),
    {
      name: "store",
    }
  )
);
