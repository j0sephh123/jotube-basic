import { useGetScreenshotsQuery } from "@shared/api";
import { useMemo } from "react";

type Props = {
  collectionItemId: string;
  collectionIds: number[];
};

export function useGalleryScreenshots({
  collectionItemId,
  collectionIds,
}: Props) {
  const {
    data,
    loading: isLoading,
    error,
  } = useGetScreenshotsQuery({
    variables: {
      input: {
        channelIds: collectionIds,
        type: "channel",
      },
    },
  });

  const videoScreenshots = useMemo(() => {
    if (!data?.getScreenshots || !collectionItemId) return [];
    return data.getScreenshots.filter(
      (screenshot) => screenshot.ytVideoId === collectionItemId
    );
  }, [data?.getScreenshots, collectionItemId]);

  return {
    videoScreenshots,
    screenshots: data?.getScreenshots,
    isLoading,
    error,
  };
}
