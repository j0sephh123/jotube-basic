export type ZoomSlice = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
  setZoom: (isVisible: boolean, url: string, onClose: () => void) => void;
  closeZoom: () => void;
};

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
