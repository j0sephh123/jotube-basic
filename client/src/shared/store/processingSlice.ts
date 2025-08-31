import type { UploadsWithThumbnailsResponse } from "@shared/api/generated/graphql";
import { proxy, useSnapshot } from "valtio";

type State = {
  items: UploadsWithThumbnailsResponse[];
  selectedItems: number[];
  currentIndex: number;
  type: "thumbnails" | "storyboards";
};

export const processingState = proxy<State>({
  items: [],
  selectedItems: [],
  currentIndex: 0,
  type: "thumbnails",
});

export const setProcessingData = (type: State["type"], data: State["items"]) => {
  if (data.length > 0 && data[0]) {
    processingState.items = data;
  } else {
    processingState.items = [];
  }
  processingState.type = type;
};

export const clearProcessingData = () => {
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
