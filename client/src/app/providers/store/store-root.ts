// client/src/app/providers/store/store-root.ts
import { create } from "zustand";
import { createZoomSlice } from "./zoom-slice";
import type { Store as StoreType } from "./store-types";

export const useStore = create<StoreType>()(
  (set, _get) =>
    ({
      ...createZoomSlice(set),
      // Minimal implementation to satisfy Store type
      isOpen: false,
      toggle: () => set((state: StoreType) => ({ isOpen: !state.isOpen })),
      close: () => set({ isOpen: false }),
      open: () => set({ isOpen: true }),
      slides: [],
      setSlides: () => {},
      thumbnailsProcessingData: [],
      setThumbnailsProcessingData: () => {},
      clearThumbnailsProcessingData: () => {},
      selectedImages: [],
      setSelectedImages: () => {},
      toggleSelectedImage: () => {},
      currentIndex: 0,
      setCurrentIndex: () => {},
      metadata: { ytChannelId: "", ytVideoId: "" },
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
