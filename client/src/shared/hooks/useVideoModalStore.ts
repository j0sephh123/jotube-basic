/* eslint-disable boundaries/element-types */
import {
  setVideoModal,
  closeVideoModal,
  getEmbedUrl,
} from "@features/Upload/model/videoModalStore";

export const useVideoModalStore = () => {
  const openVideoModal = (videoId: string, startTime: number) => {
    const embedUrl = getEmbedUrl(videoId, startTime);
    setVideoModal(true, videoId, embedUrl, startTime);
  };

  return {
    openVideoModal,
    closeVideoModal,
    getEmbedUrl,
  };
};
