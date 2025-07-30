import { useState } from "react";

export const useVideoPlayer = () => {
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>(
    {}
  );

  const handleVideoClick = (videoId: string) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [videoId]: true,
    }));
  };

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  };

  return {
    playingVideos,
    handleVideoClick,
    getEmbedUrl,
  };
};
