import type { SlideImage } from "yet-another-react-lightbox";
import type { CarouselScreenshotsSlice } from "./store-types";

export const createCarouselScreenshotsSlice = (
  set: (fn: (state: CarouselScreenshotsSlice) => Partial<CarouselScreenshotsSlice>) => void
) => ({
  slides: [],
  setSlides: (slides: SlideImage[]) => set(() => ({ slides })),
}); 