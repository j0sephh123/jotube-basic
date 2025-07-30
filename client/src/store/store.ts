import { create } from "zustand";
import { Store } from "./store-types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createSSESlice } from "./slices/sse-slice";
import { createDashboardSlice } from "../features/Dashboard/store/dashboard-slice";
import { createIgnoreListSlice } from "./slices/ignore-list-slice";
import { createSlidesSlice } from "@/features/Thumbnail/store/slides-slice";
import { thumbnailsProcessingSlice } from "@/features/Thumbnail/store/thumbnails-processing-slice";
import { createRangePickersSlice } from "@/features/Dashboard/store/range-picker-slice";

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...createSlidesSlice(set),
        ...thumbnailsProcessingSlice(set),
        ...createSSESlice(set),
        ...createDashboardSlice(set),
        ...createIgnoreListSlice(set, get),
        ...createRangePickersSlice(set, get),
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ ignoreList: state.ignoreList }),
      }
    )
  )
);
