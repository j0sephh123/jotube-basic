import { useGetChannelScreenshotsQuery } from "@/generated/graphql";

export type ChannelScreenshot = {
  __typename?: "GetSlidesResponse";
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
  isFav?: boolean | null;
};

export function useFetchChannelScreenshots(ytChannelId: string) {
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
