import { SlideImage } from "yet-another-react-lightbox";
import { ViewType } from "@/shared/hooks/useTypedParams";

export type ViewingPreviewType = { ytVideoId: string };

export type SlidesData = SlideImage[];

export type SlidesSlice = {
  slides: SlidesData;
  setSlides: (slides: SlidesData) => void;
};

export type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

export type ThumbnailsProcessingSlice = {
  thumbnailsProcessingData: ThumbnailItem[];
  setThumbnailsProcessingData: (
    arg: ThumbnailsProcessingSlice["thumbnailsProcessingData"]
  ) => void;
  selectedImages: number[];
  setSelectedImages: (arg: number[] | ((prev: number[]) => number[])) => void;
  toggleSelectedImage: (index: number, batch: number, perRow: number) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  metadata: {
    ytChannelId: string;
    ytVideoId: string;
  };
};

export type PreviewProcessingSlice = {
  previewsProcessingData: {
    type: "thumbnail" | "iframe";
    items: ThumbnailItem[];
  };
  setPreviewProcessingData: (
    arg: PreviewProcessingSlice["previewsProcessingData"]
  ) => void;
};

export type SSESlice = {
  eventSource: EventSource | null;
  setEventSource: (eventSource: EventSource | null) => void;
  operations: {
    download: { progress: number; filename: string } | null;
    screenshots: { current: number; filename: string } | null;
    thumbnails: { filename: string } | null;
  };
  setOperation: (
    type: "download" | "screenshots" | "thumbnails",
    data: { progress?: string; filename: string; current?: number } | null
  ) => void;
};

export type ActiveViewerSlice = {
  activeViewerId: "custom" | "lightbox";
  setActiveViewerId: (id: ActiveViewerSlice["activeViewerId"]) => void;
};

export type DashboardSlice = {
  requestBody: {
    sortOrder: string;
    page: number;
    min: number;
    max: number | null;
    defaultMin: number;
    defaultMax: number | null;
    viewType?: ViewType;
  };
  setRequestBody: <K extends keyof DashboardSlice["requestBody"]>(
    key: K,
    value: DashboardSlice["requestBody"][K]
  ) => void;
};

export type IgnoreListSlice = {
  ignoreList: Array<{
    ytId: string;
    title: string;
  }>;
  addToIgnoreList: (ytId: string, title: string) => void;
  removeFromIgnoreList: (ytId: string) => void;
  isIgnored: (ytId: string) => boolean;
  clearIgnoreList: () => void;
};

export enum RangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

export type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export type RangePickersSlice = {
  rangePickers: Record<RangePickerTypes, RangePickerConfig>;
  setRangePicker: (key: RangePickerTypes, config: RangePickerConfig) => void;
  updateRangePickerValues: (
    key: RangePickerTypes,
    values: ReadonlyArray<number>
  ) => void;
  getRangePicker: (key: RangePickerTypes) => RangePickerConfig | undefined;
};

export type Store = SlidesSlice &
  ThumbnailsProcessingSlice &
  SSESlice &
  DashboardSlice &
  IgnoreListSlice &
  RangePickersSlice;
