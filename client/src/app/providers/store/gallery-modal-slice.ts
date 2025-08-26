import type { GalleryModalSlice } from "./store-types";

export const createGalleryModalSlice = (
  set: (fn: (state: GalleryModalSlice) => GalleryModalSlice) => void
): GalleryModalSlice => ({
  isGalleryModalVisible: false,
  ytVideoId: "",
  ytChannelId: "",
  onClose: () => {},
  setGalleryModal: (
    ytVideoId: string,
    ytChannelId: string,
  ) =>
    set((state) => ({
      ...state,
      isGalleryModalVisible: true,
      ytVideoId,
      ytChannelId,
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
