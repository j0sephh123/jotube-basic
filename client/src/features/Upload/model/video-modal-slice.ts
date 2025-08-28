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

export const createVideoModalSlice = (
  set: (fn: (state: VideoModalSlice) => VideoModalSlice) => void
): VideoModalSlice => ({
  isVideoModalVisible: false,
  videoId: "",
  embedUrl: "",
  startTime: 0,
  onClose: () => {},
  setVideoModal: (
    isVisible: boolean,
    videoId: string,
    embedUrl: string,
    startTime: number,
    onClose: () => void
  ) =>
    set((state) => ({
      ...state,
      isVideoModalVisible: isVisible,
      videoId,
      embedUrl,
      startTime,
      onClose,
    })),
  closeVideoModal: () =>
    set((state) => {
      if (state.onClose) {
        state.onClose();
      }
      return {
        ...state,
        isVideoModalVisible: false,
        videoId: "",
        embedUrl: "",
        startTime: 0,
        onClose: () => {},
      };
    }),
  getEmbedUrl: (videoId: string, startTime?: number) => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&showinfo=1&modestbranding=1`;
    if (startTime !== undefined) {
      return `${baseUrl}&start=${startTime - 1}`;
    }
    return baseUrl;
  },
});

