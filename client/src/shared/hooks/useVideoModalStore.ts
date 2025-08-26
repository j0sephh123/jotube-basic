/* eslint-disable boundaries/element-types */
import { useVideoModal } from "@app/providers";

export const useVideoModalStore = () => {
  const { setVideoModal, closeVideoModal, getEmbedUrl } = useVideoModal();

  const openVideoModal = (videoId: string, startTime: number) => {
    const embedUrl = getEmbedUrl(videoId, startTime);
    setVideoModal(true, videoId, embedUrl, startTime, () => {});
  };

  return {
    openVideoModal,
    closeVideoModal,
    getEmbedUrl,
  };
};
