import type {
  UploadsWithThumbnailsResponse,
  UploadWithStoryboardResponse,
} from "@shared/api/generated/graphql";
import { proxy, useSnapshot } from "valtio";
import { match } from "ts-pattern";

type ThumbnailsState = {
  items: UploadsWithThumbnailsResponse[];
  selectedItems: number[];
  currentIndex: number;
  type: "thumbnails";
};

type StoryboardsState = {
  items: UploadWithStoryboardResponse[];
  type: "storyboards";
};

type State = ThumbnailsState | StoryboardsState;

export const processingState = proxy<State>({
  items: [],
  selectedItems: [],
  currentIndex: 0,
  type: "thumbnails",
});

export function setProcessingData(
  type: "thumbnails",
  data: UploadsWithThumbnailsResponse[]
): void;
export function setProcessingData(
  type: "storyboards",
  data: UploadWithStoryboardResponse[]
): void;
export function setProcessingData(
  type: State["type"],
  data: UploadsWithThumbnailsResponse[] | UploadWithStoryboardResponse[]
): void {
  match(type)
    .with("thumbnails", () => {
      processingState.type = "thumbnails";
      processingState.items = data as UploadsWithThumbnailsResponse[];
      match(processingState)
        .with({ type: "thumbnails" }, (s) => {
          if (!Array.isArray(s.selectedItems)) s.selectedItems = [];
          if (typeof s.currentIndex !== "number") s.currentIndex = 0;
        })
        .run();
    })
    .with("storyboards", () => {
      processingState.type = "storyboards";
      processingState.items = data as UploadWithStoryboardResponse[];
    })
    .exhaustive();
}

export const clearProcessingData = () => {
  processingState.items = [];
  match(processingState)
    .with({ type: "thumbnails" }, (s) => {
      s.selectedItems = [];
      s.currentIndex = 0;
    })
    .otherwise(() => {});
};

export const setSelectedImages = (
  arg: readonly number[] | number[] | ((prev: readonly number[]) => number[])
) => {
  match(processingState)
    .with({ type: "thumbnails" }, (s) => {
      s.selectedItems =
        typeof arg === "function" ? arg(s.selectedItems) : [...arg];
    })
    .otherwise(() => {});
};

export const toggleSelectedImage = (index: number, batch: number) => {
  match(processingState)
    .with({ type: "thumbnails" }, (s) => {
      const imageIndex = batch * 40 + index + 1;
      s.selectedItems = s.selectedItems.includes(imageIndex)
        ? s.selectedItems.filter((i) => i !== imageIndex)
        : [...s.selectedItems, imageIndex];
    })
    .otherwise(() => {});
};

export const setCurrentIndex = (index: number) => {
  match(processingState)
    .with({ type: "thumbnails" }, (s) => {
      s.currentIndex = index;
    })
    .otherwise(() => {});
};

export const useProcessingState = () => useSnapshot(processingState);

export const useThumbnailsProcessingState = () =>
  useSnapshot(processingState as ThumbnailsState);
export const useStoryboardsProcessingState = () =>
  useSnapshot(processingState as StoryboardsState);
