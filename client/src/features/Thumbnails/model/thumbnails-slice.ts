/* eslint-disable boundaries/element-types */
import type {
  Store as StoreType,
  ThumbnailItem,
} from "@app/providers/store/store-types";

export const createThumbnailsSlice = (
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

export type ThumbnailsProcessingSlice = {
  thumbnailsProcessingData: ThumbnailItem[];
  setThumbnailsProcessingData: (
    arg: ThumbnailsProcessingSlice["thumbnailsProcessingData"]
  ) => void;
  clearThumbnailsProcessingData: () => void;
  selectedImages: number[];
  setSelectedImages: (arg: number[] | ((prev: number[]) => number[])) => void;
  toggleSelectedImage: (index: number, batch: number, perRow: number) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  metadata: {
    ytChannelId: string;
    ytVideoId: string;
  };
};
