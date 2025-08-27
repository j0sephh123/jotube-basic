import type { Store as StoreType } from "./store-types";

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
