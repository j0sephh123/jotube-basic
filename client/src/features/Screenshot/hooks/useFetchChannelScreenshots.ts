import {
  type GetScreenshotsQuery,
  type GetScreenshotsInput,
  useGetScreenshotsQuery,
} from "@shared/api";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export type ChannelScreenshot =
  GetScreenshotsQuery["getScreenshots"][number];

export function useFetchChannelScreenshots(input: GetScreenshotsInput) {
  const { data, loading, error } = useGetScreenshotsQuery({
    variables: { input },
    skip: !input.channelIds?.length,
  });

  return {
    data: data?.getScreenshots,
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
