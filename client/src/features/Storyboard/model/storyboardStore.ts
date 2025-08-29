import { proxy, useSnapshot } from "valtio";

type State = {
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
};

const state = proxy<State>({
  storyboardProcessingData: [],
});

export const setStoryboardProcessingData = (
  data: State["storyboardProcessingData"]
) => {
  state.storyboardProcessingData = data;
};

export const clearStoryboardProcessingData = () => {
  state.storyboardProcessingData = [];
};

export const useStoryboardState = () => useSnapshot(state);
