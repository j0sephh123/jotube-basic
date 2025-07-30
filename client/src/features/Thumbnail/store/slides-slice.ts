import { Store, SlidesSlice, SlidesData } from "../store-types";

export const createSlidesSlice = (
  set: (fn: (state: Store) => Partial<Store>) => void
): SlidesSlice => ({
  slides: [],
  setSlides: (slides: SlidesData): void => set(() => ({ slides })),
});
