import { useFetchChannelScreenshots } from "@features/Screenshot";
import { useMemo } from "react";

type Props = {
  ytVideoId: string;
  ytChannelId: string;
};

export function useScreenshotsForGallery({ ytVideoId, ytChannelId }: Props) {
  const {
    data: screenshots,
    isLoading,
    error,
  } = useFetchChannelScreenshots(ytChannelId);

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
