import type { GalleryModalSlice } from "./store-types";

export const createGalleryModalSlice = (
  set: (fn: (state: GalleryModalSlice) => GalleryModalSlice) => void
): GalleryModalSlice => ({
  isGalleryModalVisible: false,
  ytVideoId: "",
  ytChannelIds: [],
  onClose: () => {},
  setGalleryModal: ({ ytVideoId, ytChannelIds }) =>
    set((state) => ({
      ...state,
      isGalleryModalVisible: true,
      ytVideoId,
      ytChannelIds,
    })),
  closeGalleryModal: () =>
    set((state) => {
      if (state.onClose) {
        state.onClose();
      }
      return {
        ...state,
        isGalleryModalVisible: false,
        ytVideoId: "",
        ytChannelId: "",
        onClose: () => {},
      };
    }),
});
