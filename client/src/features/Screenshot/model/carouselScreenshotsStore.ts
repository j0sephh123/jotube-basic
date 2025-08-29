import { proxy, useSnapshot } from "valtio";
import type { SlideImage } from "yet-another-react-lightbox";

type State = {
  slides: SlideImage[];
};

const state = proxy<State>({
  slides: [],
});

export const setSlides = (slides: readonly SlideImage[] | SlideImage[]) => {
  state.slides = [...slides];
};

export const useCarouselScreenshotsState = () => useSnapshot(state);
