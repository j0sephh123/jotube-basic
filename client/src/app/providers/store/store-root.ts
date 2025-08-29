/* eslint-disable import/no-internal-modules */
import { create } from "zustand";
import { createZoomSlice } from "../../../features/Screenshot/model/zoom-slice";
import { createVideoModalSlice } from "../../../features/Upload/model/video-modal-slice";
import type { Store as StoreType } from "./store-types";
import { createThumbnailsSlice } from "@features/Thumbnails/model";
import { createGalleryModalSlice } from "@features/Gallery/model";
import { createStoryboardProcessingSlice } from "../../../features/Storyboard/model/storyboard-processing-slice";

export const useStore = create<StoreType>()((set) => ({
  ...createZoomSlice(set),
  ...createVideoModalSlice(set),
  ...createGalleryModalSlice(set),
  ...createThumbnailsSlice(set),
  ...createStoryboardProcessingSlice(set),
}));
