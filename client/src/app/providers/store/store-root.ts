import { create } from "zustand";
import { createZoomSlice } from "./zoom-slice";
import { createVideoModalSlice } from "./video-modal-slice";
import { createGalleryModalSlice } from "./gallery-modal-slice";
import type { Store as StoreType } from "./store-types";
import { createCarouselScreenshotsSlice } from "./screenshots-for-carousel-slice";
import { createThumbnailsSlice } from "./thumbnails-slice";
import { createDashboardSlice } from "@features/Dashboard";
import { createVideosDashboardSlice } from "@features/Dashboard";

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
