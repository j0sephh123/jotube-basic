import { useGetChannelScreenshotsQuery } from "@shared/api";
import { useTypedChannelYtId } from "@features/Dashboard";

export type ChannelScreenshot = {
  __typename?: "GetSlidesResponse";
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
  isFav?: boolean | null;
};

export function useFetchChannelScreenshots() {
  const ytChannelId = useTypedChannelYtId();

  const { data, loading, error } = useGetChannelScreenshotsQuery({
    variables: { ytChannelId },
    skip: !ytChannelId,
  });

  return {
    data: data?.channelScreenshots,
    isLoading: loading,
    error,
  };
}
