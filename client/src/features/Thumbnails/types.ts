// Local types to avoid importing from app layer
import type { SlideImage } from "yet-another-react-lightbox";

export type SlidesData = SlideImage[];

export type SlidesSlice = {
  slides: SlidesData;
  setSlides: (slides: SlidesData) => void;
};

// Minimal Store type for this feature
export type Store = SlidesSlice;
