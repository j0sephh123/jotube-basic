// client/src/app/providers/store/store-root.ts
import { create } from "zustand";
import { createZoomSlice } from "./zoom-slice";
import { createVideoModalSlice } from "./video-modal-slice";
import { createGalleryModalSlice } from "./gallery-modal-slice";
import type { Store as StoreType } from "./store-types";
import { createCarouselScreenshotsSlice } from "./screenshots-for-carousel-slice";
import { createThumbnailsSlice } from "./thumbnails-slice";

export const useStore = create<StoreType>()(
  (set, _get) =>
    ({
      ...createZoomSlice(set),
      ...createVideoModalSlice(set),
      ...createGalleryModalSlice(set),
      ...createThumbnailsSlice(set),
      ...createCarouselScreenshotsSlice(set),
      storyboardProcessingData: [],
      setStoryboardProcessingData: () => {},
      clearStoryboardProcessingData: () => {},
      requestBody: {
        sortOrder: "DESC",
        page: 1,
        min: 0,
        max: null,
        defaultMin: 0,
        defaultMax: null,
        viewType: "saved",
      },
      setRequestBody: () => {},
      rangePickers: {},
      setRangePicker: () => {},
      updateRangePickerValues: () => {},
      getRangePicker: () => undefined,
      videosRequestBody: {
        sortOrder: "DESC",
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
    } as unknown as StoreType)
);
