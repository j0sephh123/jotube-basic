import type { SlideImage as ReactLightboxSlideImage } from "yet-another-react-lightbox";
import type { ViewType } from "@features/Dashboard";
import type { PlaylistSlice } from "@features/Playlist";
import type { SortOrder } from "@shared/api";

export type CarouselScreenshotsSlice = {
  slides: ReactLightboxSlideImage[];
  setSlides: (slides: ReactLightboxSlideImage[]) => void;
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



export type VideosDashboardSlice = {
  videosRequestBody: {
    sortOrder: SortOrder;
    page: number;
  };
  setVideosRequestBody: <
    K extends keyof {
      sortOrder: SortOrder;
      page: number;
    }
  >(
    key: K,
    value: {
      sortOrder: SortOrder;
      page: number;
    }[K]
  ) => void;
};



export type ZoomSlice = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
  setZoom: (isVisible: boolean, url: string, onClose: () => void) => void;
  closeZoom: () => void;
};

export type VideoModalSlice = {
  isVideoModalVisible: boolean;
  videoId: string;
  embedUrl: string;
  startTime: number;
  onClose: () => void;
  setVideoModal: (
    isVisible: boolean,
    videoId: string,
    embedUrl: string,
    startTime: number,
    onClose: () => void
  ) => void;
  closeVideoModal: () => void;
  getEmbedUrl: (videoId: string, startTime?: number) => string;
};

export type GalleryModalSlice = {
  isGalleryModalVisible: boolean;
  ytVideoId: string;
  ytChannelId: string;
  onClose: () => void;
  setGalleryModal: (props: { ytVideoId: string; ytChannelId: string }) => void;
  closeGalleryModal: () => void;
};

export type Store = CarouselScreenshotsSlice &
  ThumbnailsProcessingSlice &
  StoryboardProcessingSlice &
  DashboardSlice &
  VideosDashboardSlice &
  PlaylistSlice &
  ZoomSlice &
  VideoModalSlice &
  GalleryModalSlice;
