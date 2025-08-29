/* eslint-disable import/no-internal-modules */
import type { ThumbnailsProcessingSlice } from "@features/Thumbnails/model";

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

export type Store = ThumbnailsProcessingSlice & StoryboardProcessingSlice;
