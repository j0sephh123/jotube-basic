/* eslint-disable boundaries/element-types */
import { useEffect } from "react";
import { snapshot, subscribe } from "valtio";
import { thumbnailsStoreState } from "@features/Thumbnails";

export function Debug() {
  useEffect(() => {
    const unsub = subscribe(thumbnailsStoreState, () => {
      const state = snapshot(thumbnailsStoreState);
      console.group("VALTIO STATE");
      console.log("index", state.currentIndex);
      console.log("thumbnailsProcessingData", state.thumbnailsProcessingData);
      console.log("selectedImages", state.selectedImages);
      console.groupEnd();
    });
    return unsub;
  }, []);
  return null;
}
