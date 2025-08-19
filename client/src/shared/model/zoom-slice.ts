import { ZoomSlice } from "@/app/providers/store/store-types";

export const createZoomSlice = (
  set: (fn: (state: ZoomSlice) => ZoomSlice) => void
): ZoomSlice => ({
  isVisible: false,
  url: "",
  onClose: () => {},
  setZoom: (isVisible: boolean, url: string, onClose: () => void) =>
    set((state) => ({
      ...state,
      isVisible,
      url,
      onClose,
    })),
  closeZoom: () =>
    set((state) => ({
      ...state,
      isVisible: false,
      url: "",
      onClose: () => {},
    })),
});
