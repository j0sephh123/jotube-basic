import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useVideosDashboardContext } from "..";
import { useFetchVideosDashboardQuery } from "@shared/api";

export function useVideosDashboardQuery() {
  const { videosRequestBody } = useVideosDashboardContext();

  const variables = {
    page: videosRequestBody.page,
    sortOrder: videosRequestBody.sortOrder.toLowerCase() as "asc" | "desc",
    screenshotMin:
      videosRequestBody.minScreenshots > 0
        ? videosRequestBody.minScreenshots
        : undefined,
    screenshotMax: videosRequestBody.maxScreenshots || undefined,
  };

  const { data, loading, error, refetch } = useFetchVideosDashboardQuery({
    variables,
    fetchPolicy: "cache-and-network",
  });

  return {
    data: data?.fetchVideosDashboard,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchVideosDashboard() {
  const queryClient = useQueryClient();
  const { videosRequestBody } = useVideosDashboardContext();

  return useCallback(() => {
    const variables = {
      page: videosRequestBody.page,
      sortOrder: videosRequestBody.sortOrder.toLowerCase() as "asc" | "desc",
      screenshotMin:
        videosRequestBody.minScreenshots > 0
          ? videosRequestBody.minScreenshots
          : undefined,
      screenshotMax: videosRequestBody.maxScreenshots || undefined,
    };

    queryClient.refetchQueries({
      queryKey: ["fetchVideosDashboard", variables],
    });
  }, [queryClient, videosRequestBody]);
}
