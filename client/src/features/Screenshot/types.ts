// Local types for Screenshot feature to avoid importing from app layer
import type { SlideImage } from "yet-another-react-lightbox";

export type SlidesData = SlideImage[];

export type SlidesSlice = {
  slides: SlidesData;
  setSlides: (slides: SlidesData) => void;
};

export type ZoomSlice = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
  setZoom: (isVisible: boolean, url: string, onClose: () => void) => void;
  closeZoom: () => void;
};

// Minimal Store type for this feature
export type Store = SlidesSlice & ZoomSlice;
