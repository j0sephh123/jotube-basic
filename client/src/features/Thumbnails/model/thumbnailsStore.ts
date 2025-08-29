import { proxy, useSnapshot } from "valtio";

type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

type State = {
  metadata: { ytChannelId: string; ytVideoId: string };
  thumbnailsProcessingData: ThumbnailItem[];
  selectedImages: number[];
  currentIndex: number;
};

const state = proxy<State>({
  metadata: { ytChannelId: "", ytVideoId: "" },
  thumbnailsProcessingData: [],
  selectedImages: [],
  currentIndex: 0,
});

export const setThumbnailsProcessingData = (
  data: { ytChannelId: string; ytVideoId: string }[]
) => {
  if (data.length > 0 && data[0]) {
    state.thumbnailsProcessingData = data;
    state.metadata = {
      ytChannelId: data[0].ytChannelId,
      ytVideoId: data[0].ytVideoId,
    };
  } else {
    state.thumbnailsProcessingData = [];
    state.metadata = { ytChannelId: "", ytVideoId: "" };
  }
};

export const clearThumbnailsProcessingData = () => {
  state.thumbnailsProcessingData = [];
  state.metadata = { ytChannelId: "", ytVideoId: "" };
};

export const setSelectedImages = (
  arg: readonly number[] | number[] | ((prev: readonly number[]) => number[])
) => {
  if (typeof arg === "function") {
    state.selectedImages = arg(state.selectedImages);
  } else {
    state.selectedImages = [...arg];
  }
};

export const toggleSelectedImage = (index: number, batch: number) => {
  const imageIndex = batch * 40 + index + 1;
  if (state.selectedImages.includes(imageIndex)) {
    state.selectedImages = state.selectedImages.filter((i) => i !== imageIndex);
  } else {
    state.selectedImages = [...state.selectedImages, imageIndex];
  }
};

export const setCurrentIndex = (index: number) => {
  state.currentIndex = index;
};

export const useThumbnailsState = () => useSnapshot(state);
