import { proxy, useSnapshot } from "valtio";

type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

type State = {
  items: ThumbnailItem[];
  selectedItems: number[];
  currentIndex: number;
};

export const processingState = proxy<State>({
  items: [],
  selectedItems: [],
  currentIndex: 0,
});

export const setProcessingData = (
  data: { ytChannelId: string; ytVideoId: string }[]
) => {
  if (data.length > 0 && data[0]) {
    processingState.items = data;
  } else {
    processingState.items = [];
  }
};

export const clearThumbnailsProcessingData = () => {
  processingState.items = [];
};

export const setSelectedImages = (
  arg: readonly number[] | number[] | ((prev: readonly number[]) => number[])
) => {
  if (typeof arg === "function") {
    processingState.selectedItems = arg(processingState.selectedItems);
  } else {
    processingState.selectedItems = [...arg];
  }
};

export const toggleSelectedImage = (index: number, batch: number) => {
  const imageIndex = batch * 40 + index + 1;
  if (processingState.selectedItems.includes(imageIndex)) {
    processingState.selectedItems = processingState.selectedItems.filter(
      (i) => i !== imageIndex
    );
  } else {
    processingState.selectedItems = [
      ...processingState.selectedItems,
      imageIndex,
    ];
  }
};

export const setCurrentIndex = (index: number) => {
  processingState.currentIndex = index;
};

export const useProcessingState = () => useSnapshot(processingState);
