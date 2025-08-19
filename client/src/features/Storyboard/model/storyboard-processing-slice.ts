import {
  Store,
  StoryboardProcessingSlice,
} from "@/app/providers/store/store-types";

export const createStoryboardProcessingSlice = (
  set: (fn: (state: Store) => Partial<Store>) => void
): StoryboardProcessingSlice => ({
  storyboardProcessingData: [],
  setStoryboardProcessingData: (data) =>
    set(() => ({
      storyboardProcessingData: data,
    })),
  clearStoryboardProcessingData: () =>
    set(() => ({
      storyboardProcessingData: [],
    })),
});
