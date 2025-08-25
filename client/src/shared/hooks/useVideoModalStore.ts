import { useVideoModal } from "@app/providers/store/store-hooks";

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
