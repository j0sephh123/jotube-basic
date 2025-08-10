import { useState, useEffect } from "react";

export const useVideoModal = () => {
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoModalVisible) {
        setIsVideoModalVisible(false);
      }
    };

    if (isVideoModalVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVideoModalVisible]);

  const getEmbedUrl = (videoId: string, startTime?: number) => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&showinfo=1&modestbranding=1`;
    if (startTime !== undefined) {
      return `${baseUrl}&start=${startTime - 1}`;
    }
    return baseUrl;
  };

  const openVideoModal = () => setIsVideoModalVisible(true);
  const closeVideoModal = () => setIsVideoModalVisible(false);

  return {
    isVideoModalVisible,
    openVideoModal,
    closeVideoModal,
    getEmbedUrl,
  };
};
