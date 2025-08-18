import { SlideImage } from "yet-another-react-lightbox";
import { ViewType } from "@widgets/Dashboard/lib/useDashboardParams";
import { SidePanelSlice } from "@store/slices/side-panel-slice";
import { PlaylistSlice } from "@features/Playlist/store";
import { SortOrder } from "@/shared/api/generated/graphql";

export type SlidesData = SlideImage[];

export type SlidesSlice = {
  slides: SlidesData;
  setSlides: (slides: SlidesData) => void;
};

export type ThumbnailItem = {
  ytChannelId: string;
  ytVideoId: string;
};

export type StoryboardProcessingSlice = {
  storyboardProcessingData: Array<{
    ytChannelId: string;
    uploads: Array<{
      id: number;
      ytId: string;
      title: string;
      src: string;
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
      channelId: number;
      nextPageToken: string | null;
      duration: number | null;
      artifact: string;
      storyboard: {
        id: number;
        uploadsVideoId: number;
        fragments: number;
        url: string;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  }>;
  setStoryboardProcessingData: (
    data: StoryboardProcessingSlice["storyboardProcessingData"]
  ) => void;
  clearStoryboardProcessingData: () => void;
};

export type ThumbnailsProcessingSlice = {
  thumbnailsProcessingData: ThumbnailItem[];
  setThumbnailsProcessingData: (
    arg: ThumbnailsProcessingSlice["thumbnailsProcessingData"]
  ) => void;
  clearThumbnailsProcessingData: () => void;
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

export type VideosDashboardSlice = {
  videosRequestBody: {
    sortOrder: SortOrder;
    page: number;
    minScreenshots: number;
    maxScreenshots: number | null;
  };
  setVideosRequestBody: <
    K extends keyof {
      sortOrder: SortOrder;
      page: number;
      minScreenshots: number;
      maxScreenshots: number | null;
    }
  >(
    key: K,
    value: {
      sortOrder: SortOrder;
      page: number;
      minScreenshots: number;
      maxScreenshots: number | null;
    }[K]
  ) => void;
};

export type VideosRangePickersSlice = {
  videosRangePickers: Record<
    string,
    {
      values: ReadonlyArray<number>;
      min: number;
      max: number;
      stepSize: number;
    }
  >;
  setVideosRangePicker: (
    key: string,
    config: {
      values: ReadonlyArray<number>;
      min: number;
      max: number;
      stepSize: number;
    }
  ) => void;
  updateVideosRangePickerValues: (
    key: string,
    values: ReadonlyArray<number>
  ) => void;
  getVideosRangePicker: (key: string) =>
    | {
        values: ReadonlyArray<number>;
        min: number;
        max: number;
        stepSize: number;
      }
    | undefined;
};

export type ZoomSlice = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
  setZoom: (isVisible: boolean, url: string, onClose: () => void) => void;
  closeZoom: () => void;
};

export type Store = SlidesSlice &
  ThumbnailsProcessingSlice &
  StoryboardProcessingSlice &
  DashboardSlice &
  RangePickersSlice &
  VideosDashboardSlice &
  VideosRangePickersSlice &
  SidePanelSlice &
  PlaylistSlice &
  ZoomSlice;
