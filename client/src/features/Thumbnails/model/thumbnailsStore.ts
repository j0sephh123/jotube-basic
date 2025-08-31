import type { UploadsWithThumbnailsResponse } from "@shared/api/generated/graphql";
import { proxy, useSnapshot } from "valtio";

type State = {
  items: UploadsWithThumbnailsResponse[];
  selectedItems: number[];
  currentIndex: number;
  type: "thumbnails" | "storyboards";
};

const thumbnailsState = proxy<State>({
  items: [],
  selectedItems: [],
  currentIndex: 0,
  type: "thumbnails",
});

export const setProcessingData = (type: State["type"], data: State["items"]) => {
  if (data.length > 0 && data[0]) {
    thumbnailsState.items = data;
  } else {
    thumbnailsState.items = [];
  }
  thumbnailsState.type = type;
};

export const clearProcessingData = () => {
  thumbnailsState.items = [];
};

export const setSelectedImages = (
  arg: readonly number[] | number[] | ((prev: readonly number[]) => number[])
) => {
  if (typeof arg === "function") {
    thumbnailsState.selectedItems = arg(thumbnailsState.selectedItems);
  } else {
    thumbnailsState.selectedItems = [...arg];
  }
};

export const toggleSelectedImage = (index: number, batch: number) => {
  const imageIndex = batch * 40 + index + 1;
  if (thumbnailsState.selectedItems.includes(imageIndex)) {
    thumbnailsState.selectedItems = thumbnailsState.selectedItems.filter(
      (i) => i !== imageIndex
    );
  } else {
    thumbnailsState.selectedItems = [
      ...thumbnailsState.selectedItems,
      imageIndex,
    ];
  }
};

export const setCurrentIndex = (index: number) => {
  thumbnailsState.currentIndex = index;
};

export const useThumbnailsStore = () => useSnapshot(thumbnailsState);
