/* eslint-disable import/no-internal-modules */
import { create } from "zustand";
import type { Store as StoreType } from "./store-types";
import { createThumbnailsSlice } from "@features/Thumbnails/model";
import { createStoryboardProcessingSlice } from "../../../features/Storyboard/model/storyboard-processing-slice";

export const useStore = create<StoreType>()((set) => ({
  ...createThumbnailsSlice(set),
  ...createStoryboardProcessingSlice(set),
}));
