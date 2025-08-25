import { useTypedVideoYtId } from "@features/Dashboard";
import { useFetchChannelScreenshots } from "@features/Screenshot";
import { useMemo } from "react";

export function useGalleryVideoScreenshots() {
  const ytVideoId = useTypedVideoYtId();

  const { data: screenshots, isLoading, error } = useFetchChannelScreenshots();

  const videoScreenshots = useMemo(() => {
    if (!screenshots || !ytVideoId) return [];
    return screenshots.filter(
      (screenshot) => screenshot.ytVideoId === ytVideoId
    );
  }, [screenshots, ytVideoId]);

  return {
    videoScreenshots,
    screenshots,
    isLoading,
    error,
  };
}
