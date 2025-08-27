import { create } from "zustand";
import { createZoomSlice } from "./zoom-slice";
import { createVideoModalSlice } from "./video-modal-slice";
import { createGalleryModalSlice } from "./gallery-modal-slice";
import type { Store as StoreType } from "./store-types";
import { createCarouselScreenshotsSlice } from "./screenshots-for-carousel-slice";
import { createThumbnailsSlice } from "./thumbnails-slice";
import { SortOrder } from "@shared/api";
import { ViewType } from "@features/Dashboard";

export const useStore = create<StoreType>()((set, _get) => ({
  ...createZoomSlice(set),
  ...createVideoModalSlice(set),
  ...createGalleryModalSlice(set),
  ...createThumbnailsSlice(set),
  ...createCarouselScreenshotsSlice(set),
  storyboardProcessingData: [],
  setStoryboardProcessingData: () => {},
  clearStoryboardProcessingData: () => {},
  requestBody: {
    sortOrder: SortOrder.Desc,
    page: 1,
    min: 0,
    max: null,
    defaultMin: 0,
    defaultMax: null,
    viewType: ViewType.SAVED,
  },
  setRequestBody: () => {},
  rangePickers: {
    processed: {
      values: [],
      min: 0,
      max: 0,
      stepSize: 0,
    },
    defaults: {
      values: [],
      min: 0,
      max: 0,
      stepSize: 0,
    },
  },
  setRangePicker: () => {},
  updateRangePickerValues: () => {},
  getRangePicker: () => undefined,
  videosRequestBody: {
    sortOrder: SortOrder.Desc,
    page: 1,
    minScreenshots: 0,
    maxScreenshots: null,
  },
  setVideosRequestBody: () => {},
  videosRangePickers: {},
  setVideosRangePicker: () => {},
  updateVideosRangePickerValues: () => {},
  getVideosRangePicker: () => undefined,
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
