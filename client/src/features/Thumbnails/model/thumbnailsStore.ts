/* eslint-disable import/no-internal-modules */
import { proxy, useSnapshot } from "valtio";

type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

type State = {
  thumbnailsProcessingData: ThumbnailItem[];
  selectedImages: number[];
  currentIndex: number;
};

export const thumbnailsStoreState = proxy<State>({
  thumbnailsProcessingData: [],
  selectedImages: [],
  currentIndex: 0,
});

export const setThumbnailsProcessingData = (
  data: { ytChannelId: string; ytVideoId: string }[]
) => {
  if (data.length > 0 && data[0]) {
    thumbnailsStoreState.thumbnailsProcessingData = data;
  } else {
    thumbnailsStoreState.thumbnailsProcessingData = [];
  }
};

export const clearThumbnailsProcessingData = () => {
  thumbnailsStoreState.thumbnailsProcessingData = [];
};

export const setSelectedImages = (
  arg: readonly number[] | number[] | ((prev: readonly number[]) => number[])
) => {
  if (typeof arg === "function") {
    thumbnailsStoreState.selectedImages = arg(thumbnailsStoreState.selectedImages);
  } else {
    thumbnailsStoreState.selectedImages = [...arg];
  }
};

export const toggleSelectedImage = (index: number, batch: number) => {
  const imageIndex = batch * 40 + index + 1;
  if (thumbnailsStoreState.selectedImages.includes(imageIndex)) {
    thumbnailsStoreState.selectedImages = thumbnailsStoreState.selectedImages.filter((i) => i !== imageIndex);
  } else {
    thumbnailsStoreState.selectedImages = [...thumbnailsStoreState.selectedImages, imageIndex];
  }
};

export const setCurrentIndex = (index: number) => {
  thumbnailsStoreState.currentIndex = index;
};

export const useThumbnailsState = () => useSnapshot(thumbnailsStoreState);
