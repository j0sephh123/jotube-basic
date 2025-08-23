// client/src/app/providers/store/store-root.ts
import { create } from "zustand";
import { createZoomSlice } from "./zoom-slice";
import type { Store as StoreType } from "./store-types";
import type { SlideImage } from "yet-another-react-lightbox";

// Local thumbnails slice implementation
const createThumbnailsSlice = (
  set: (fn: (state: StoreType) => Partial<StoreType>) => void
) => ({
  metadata: { ytChannelId: "", ytVideoId: "" },
  thumbnailsProcessingData: [],
  setThumbnailsProcessingData: (
    data: { ytChannelId: string; ytVideoId: string }[]
  ) =>
    set(() => {
      if (data.length > 0 && data[0]) {
        return {
          thumbnailsProcessingData: data,
          metadata: {
            ytChannelId: data[0].ytChannelId,
            ytVideoId: data[0].ytVideoId,
          },
        };
      }
      return {
        thumbnailsProcessingData: [],
        metadata: { ytChannelId: "", ytVideoId: "" },
      };
    }),
  clearThumbnailsProcessingData: () =>
    set(() => ({
      thumbnailsProcessingData: [],
      metadata: { ytChannelId: "", ytVideoId: "" },
    })),
  selectedImages: [],
  setSelectedImages: (arg: number[] | ((prev: number[]) => number[])) =>
    set((state) => ({
      selectedImages:
        typeof arg === "function" ? arg(state.selectedImages) : arg,
    })),
  toggleSelectedImage: (index: number, batch: number) =>
    set((state) => {
      const imageIndex = batch * 40 + index + 1;
      return {
        selectedImages: state.selectedImages.includes(imageIndex)
          ? state.selectedImages.filter((i) => i !== imageIndex)
          : [...state.selectedImages, imageIndex],
      };
    }),
  currentIndex: 0,
  setCurrentIndex: (index: number) => set(() => ({ currentIndex: index })),
});

// Local slides slice implementation
const createSlidesSlice = (
  set: (fn: (state: StoreType) => Partial<StoreType>) => void
) => ({
  slides: [],
  setSlides: (slides: SlideImage[]) => set(() => ({ slides })),
});

export const useStore = create<StoreType>()(
  (set, _get) =>
    ({
      ...createZoomSlice(set),
      ...createThumbnailsSlice(set),
      ...createSlidesSlice(set),
      // Minimal implementation to satisfy Store type
      isOpen: false,
      toggle: () => set((state: StoreType) => ({ isOpen: !state.isOpen })),
      close: () => set({ isOpen: false }),
      open: () => set({ isOpen: true }),
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
