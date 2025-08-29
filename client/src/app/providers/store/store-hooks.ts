/* eslint-disable import/no-internal-modules */
import { useStore } from "./store-root";
import type { GalleryModalSlice } from "@features/Gallery/model";
import type { StoryboardProcessingSlice, Store } from "./store-types";
import type { ThumbnailsProcessingSlice } from "@features/Thumbnails/model";
import { makeScopedHook } from "@shared/lib";

export const useThumbnailsSlice = makeScopedHook<
  Store,
  ThumbnailsProcessingSlice
>(useStore, (store: Store) => store);

export const useStoryboardProcessing = makeScopedHook<
  Store,
  StoryboardProcessingSlice
>(useStore, (store: Store) => store);

export const useGalleryModal = makeScopedHook<Store, GalleryModalSlice>(
  useStore,
  (store: Store) => store
);
