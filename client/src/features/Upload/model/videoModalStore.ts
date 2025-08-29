import { proxy, useSnapshot } from "valtio";

type State = {
  isVideoModalVisible: boolean;
  videoId: string;
  embedUrl: string;
  startTime: number;
};

const state = proxy<State>({
  isVideoModalVisible: false,
  videoId: "",
  embedUrl: "",
  startTime: 0,
});

export const setVideoModal = (
  isVisible: boolean,
  videoId: string,
  embedUrl: string,
  startTime: number
) => {
  state.isVideoModalVisible = isVisible;
  state.videoId = videoId;
  state.embedUrl = embedUrl;
  state.startTime = startTime;
};

export const closeVideoModal = () => {
  state.isVideoModalVisible = false;
  state.videoId = "";
  state.embedUrl = "";
  state.startTime = 0;
};

export const getEmbedUrl = (videoId: string, startTime?: number) => {
  const baseUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&showinfo=1&modestbranding=1`;
  if (startTime !== undefined) {
    return `${baseUrl}&start=${startTime - 1}`;
  }
  return baseUrl;
};

export const useVideoModalState = () => useSnapshot(state);
