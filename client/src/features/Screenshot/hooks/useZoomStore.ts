import { create } from "zustand";

type ZoomStore = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
  setZoom: (isVisible: boolean, url: string, onClose: () => void) => void;
  closeZoom: () => void;
};

export const useZoomStore = create<ZoomStore>((set) => ({
  isVisible: false,
  url: "",
  onClose: () => {},
  setZoom: (isVisible, url, onClose) => set({ isVisible, url, onClose }),
  closeZoom: () => set({ isVisible: false, url: "", onClose: () => {} }),
}));
