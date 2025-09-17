import { type GetScreenshotsQuery } from "@shared/api";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export type ChannelScreenshot = GetScreenshotsQuery["getScreenshots"][number];

export function useRefetchChannelScreenshots() {
  const queryClient = useApolloClient();

  return useCallback(() => {
    queryClient.refetchQueries({ include: ["GetChannelScreenshots"] });
  }, [queryClient]);
}
