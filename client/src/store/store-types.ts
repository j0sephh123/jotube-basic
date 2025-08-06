import { SlideImage } from "yet-another-react-lightbox";
import { ViewType } from "@/shared/hooks/useTypedParams";
import { SortOrder } from "@/shared/types/searchParams";

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

export type WebSocketSlice = {
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

export type DashboardSlice = {
  requestBody: {
    sortOrder: SortOrder;
    page: number;
    min: number;
    max: number | null;
    defaultMin: number;
    defaultMax: number | null;
    viewType: ViewType;
  };
  setRequestBody: <K extends keyof DashboardSlice["requestBody"]>(
    key: K,
    value: DashboardSlice["requestBody"][K]
  ) => void;
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
  WebSocketSlice &
  DashboardSlice &
  RangePickersSlice;
