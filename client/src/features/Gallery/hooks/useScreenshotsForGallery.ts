import { useFetchChannelScreenshots } from "@features/Screenshot";
import { useMemo } from "react";

type Props = {
  ytVideoId: string;
  ytChannelIds: string[];
};

export function useScreenshotsForGallery({ ytVideoId, ytChannelIds }: Props) {
  const {
    data: screenshots,
    isLoading,
    error,
  } = useFetchChannelScreenshots(ytChannelIds);

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
