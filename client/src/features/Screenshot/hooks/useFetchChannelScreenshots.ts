import { useGetChannelScreenshotsQuery } from "@shared/api";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export type ChannelScreenshot = {
  __typename?: "GetSlidesResponse";
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
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

export function useRefetchChannelScreenshots() {
  const queryClient = useApolloClient();

  return useCallback(() => {
    queryClient.refetchQueries({ include: ["GetChannelScreenshots"] });
  }, [queryClient]);
}
