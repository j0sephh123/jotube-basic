/* eslint-disable import/no-internal-modules */
import { create } from "zustand";
import { createZoomSlice } from "../../../features/Screenshot/model/zoom-slice";
import { createVideoModalSlice } from "../../../features/Upload/model/video-modal-slice";
import type { Store as StoreType } from "./store-types";
import { createCarouselScreenshotsSlice } from "@features/Screenshot/model";
import { createThumbnailsSlice } from "@features/Thumbnails/model";
import { createDashboardSlice } from "@features/Dashboard";
import { createVideosDashboardSlice } from "@features/Dashboard";
import { createGalleryModalSlice } from "@features/Gallery/model";

export const useStore = create<StoreType>()((set, _get) => ({
  ...createZoomSlice(set),
  ...createVideoModalSlice(set),
  ...createGalleryModalSlice(set),
  ...createThumbnailsSlice(set),
  ...createCarouselScreenshotsSlice(set),
  ...createDashboardSlice(set),
  ...createVideosDashboardSlice(set),
  storyboardProcessingData: [],
  setStoryboardProcessingData: () => {},
  clearStoryboardProcessingData: () => {},
  playlists: [],
  setPlaylists: () => {},
  addPlaylist: () => {},
  removePlaylist: () => {},
  isModalOpen: false,
  ytChannelId: "",
  showCreateForm: false,
  openPlaylistModal: () => {},
  closePlaylistModal: () => {},
  setYtChannelId: () => {},
  setShowCreateForm: () => {},
  resetFormState: () => {},
}));
