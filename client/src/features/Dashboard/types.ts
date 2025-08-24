import type { 
  DashboardChannelResponse,
  DashboardVideoResponse,
  ChannelsDashboardResponse,
  VideosDashboardResponse,
  SortOrder 
} from "@shared/api";
import { SortOrder as SortOrderEnum } from "@shared/api";

export type DashboardChannel = DashboardChannelResponse;

export type DashboardVideo = DashboardVideoResponse;

export type ChannelsDashboardResponse = ChannelsDashboardResponse;

export type VideosDashboardResponse = VideosDashboardResponse;

// Local types for Dashboard feature to avoid importing from app layer
export const videosDefaults: {
  sortOrder: SortOrder;
  page: number;
  minScreenshots: number;
  maxScreenshots: number | null;
} = {
  sortOrder: SortOrderEnum.Desc,
  page: 1,
  minScreenshots: 0,
  maxScreenshots: null as number | null,
};

export type VideosDashboardSlice = {
  videosRequestBody: typeof videosDefaults;
  setVideosRequestBody: <K extends keyof typeof videosDefaults>(
    key: K,
    value: (typeof videosDefaults)[K]
  ) => void;
};

// Minimal Store type for this feature
export type Store = VideosDashboardSlice;
