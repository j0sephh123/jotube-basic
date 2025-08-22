import { useSlides as useSlidesStore } from "@app/providers/store/store-hooks";

export const useSlides = () => {
  return useSlidesStore();
};
