import type {
  UploadsWithThumbnailsResponse,
  UploadWithStoryboardResponse,
} from "@shared/api/generated/graphql";
import { proxy, useSnapshot } from "valtio";
import { match } from "ts-pattern";

type EpisodesProcessingData = {
  tvIdentifier: string;
  episodeIdentifier: string;
  episodeId: number;
};

type ThumbnailsState = {
  items: UploadsWithThumbnailsResponse[];
  selectedItems: number[];
  currentIndex: number;
  type: "thumbnails";
};

type StoryboardsState = {
  items: UploadWithStoryboardResponse[];
  type: "storyboards";
  gridCols: number;
};

type EpisodesState = {
  items: EpisodesProcessingData[];
  selectedItems: number[];
  currentIndex: number;
  type: "episodes";
};

type State = ThumbnailsState | StoryboardsState | EpisodesState;

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
  type: "episodes",
  data: EpisodesProcessingData[]
): void;
export function setProcessingData(
  type: State["type"],
  data:
    | UploadsWithThumbnailsResponse[]
    | UploadWithStoryboardResponse[]
    | EpisodesProcessingData[]
): void {
  match(type)
    .with("thumbnails", () => {
      processingState.type = "thumbnails";
      processingState.items = data;
      match(processingState)
        .with({ type: "thumbnails" }, (s) => {
          if (!Array.isArray(s.selectedItems)) s.selectedItems = [];
          if (typeof s.currentIndex !== "number") s.currentIndex = 0;
        })
        .run();
    })
    .with("storyboards", () => {
      processingState.type = "storyboards";
      processingState.items = data;
      match(processingState)
        .with({ type: "storyboards" }, (s) => {
          if (typeof s.gridCols !== "number") s.gridCols = 2;
        })
        .run();
    })
    .with("episodes", () => {
      processingState.type = "episodes";
      processingState.items = data;
      match(processingState)
        .with({ type: "episodes" }, (s) => {
          if (!Array.isArray(s.selectedItems)) s.selectedItems = [];
          if (typeof s.currentIndex !== "number") s.currentIndex = 0;
        })
        .run();
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
    .with({ type: "episodes" }, (s) => {
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
    .with({ type: "episodes" }, (s) => {
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
    .with({ type: "episodes" }, (s) => {
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
    .with({ type: "episodes" }, (s) => {
      s.currentIndex = index;
    })
    .otherwise(() => {});
};

export const setGridCols = (cols: number) => {
  match(processingState)
    .with({ type: "storyboards" }, (s) => {
      s.gridCols = cols;
    })
    .otherwise(() => {});
};

export const useProcessingState = () => useSnapshot(processingState);

export const useThumbnailsProcessingState = () => {
  const state = useSnapshot(processingState as ThumbnailsState);

  return state;
};
export const useStoryboardsProcessingState = () => {
  const state = useSnapshot(processingState as StoryboardsState);

  return state;
};
export const useEpisodesProcessingState = () =>
  useSnapshot(processingState as EpisodesState);
