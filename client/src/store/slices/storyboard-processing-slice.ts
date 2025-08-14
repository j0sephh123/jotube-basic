import { Store, StoryboardProcessingSlice } from "@/store/store-types";

export const createStoryboardProcessingSlice = (
  set: (fn: (state: Store) => Partial<Store>) => void
): StoryboardProcessingSlice => ({
  storyboardProcessingData: {
    ytChannelId: "",
    ytVideoIds: [],
  },
  setStoryboardProcessingData: (data) =>
    set(() => ({
      storyboardProcessingData: data,
    })),
  clearStoryboardProcessingData: () =>
    set(() => ({
      storyboardProcessingData: {
        ytChannelId: "",
        ytVideoIds: [],
      },
    })),
});
