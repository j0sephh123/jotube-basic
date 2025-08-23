import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Local hook implementations to avoid cross-layer dependencies
const useLocalVideosDashboard = () => {
  return {
    videosRequestBody: {
      sortOrder: "DESC" as const,
      page: 1,
      minScreenshots: 0,
      maxScreenshots: null,
    },
  };
};

const useLocalFetchVideosDashboard = (
  _requestBody: Record<string, unknown>
) => {
  return {
    data: { fetchVideosDashboard: null },
    loading: false,
    error: null,
    refetch: () => {},
  };
};

export function useVideosDashboardQuery() {
  const { videosRequestBody: requestBody } = useLocalVideosDashboard();

  const { data, loading, error, refetch } =
    useLocalFetchVideosDashboard(requestBody);

  return {
    data: data?.fetchVideosDashboard,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchVideosDashboard() {
  const queryClient = useQueryClient();
  const { videosRequestBody: requestBody } = useLocalVideosDashboard();

  return useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ["dashboard", "videos", requestBody],
    });
  }, [queryClient, requestBody]);
}
