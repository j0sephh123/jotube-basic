import { useFetchChannelScreenshots } from "@features/Screenshot";
import { useMemo } from "react";

type Props = {
  ytVideoId: string;
  channelIds: number[];
};

export function useScreenshotsForGallery({ ytVideoId, channelIds }: Props) {
  const {
    data: screenshots,
    isLoading,
    error,
  } = useFetchChannelScreenshots({
    channelIds,
    type: "channel",
    shuffle: false,
  });

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
