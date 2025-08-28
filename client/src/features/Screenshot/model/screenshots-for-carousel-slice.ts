import type { SlideImage } from "yet-another-react-lightbox";

export type CarouselScreenshotsSlice = {
  slides: SlideImage[];
  setSlides: (slides: SlideImage[]) => void;
};

export const createCarouselScreenshotsSlice = (
  set: (
    fn: (state: CarouselScreenshotsSlice) => Partial<CarouselScreenshotsSlice>
  ) => void
) => ({
  slides: [],
  setSlides: (slides: SlideImage[]) => set(() => ({ slides })),
});
