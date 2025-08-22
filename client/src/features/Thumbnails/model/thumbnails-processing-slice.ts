import type { Store, ThumbnailsProcessingSlice } from "../types";

export const thumbnailsProcessingSlice = (
  set: (fn: (state: Store) => Partial<Store>) => void
): ThumbnailsProcessingSlice => ({
  metadata: {
    ytChannelId: "",
    ytVideoId: "",
  },
  thumbnailsProcessingData: [],
  setThumbnailsProcessingData: (thumbnailsProcessingData) =>
    set(() => {
      if (thumbnailsProcessingData.length > 0 && thumbnailsProcessingData[0]) {
        return {
          thumbnailsProcessingData,
          metadata: {
            ytChannelId: thumbnailsProcessingData[0].ytChannelId,
            ytVideoId: thumbnailsProcessingData[0].ytVideoId,
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
  setSelectedImages: (arg) =>
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
  setCurrentIndex: (index: number) =>
    set(() => ({
      currentIndex: index,
    })),
});
