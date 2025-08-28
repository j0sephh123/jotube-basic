import {
  type GetChannelScreenshotsQuery,
  useGetChannelScreenshotsQuery,
} from "@shared/api";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export type ChannelScreenshot =
  GetChannelScreenshotsQuery["channelScreenshots"][number];

export function useFetchChannelScreenshots(ytChannelIds: string[]) {
  const { data, loading, error } = useGetChannelScreenshotsQuery({
    variables: { input: { ytChannelIds } },
    skip: !ytChannelIds?.length,
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
