import { create } from "zustand";
import type { SlidesData } from "../types";

type SlidesStore = {
  slides: SlidesData;
  setSlides: (slides: SlidesData) => void;
};

const useSlidesStore = create<SlidesStore>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),
}));

export const useSlides = () => {
  return useSlidesStore();
};
