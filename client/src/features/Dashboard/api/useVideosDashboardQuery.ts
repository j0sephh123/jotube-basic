import { useQueryClient } from "@tanstack/react-query";
import { useVideosDashboard } from "@/app/providers/store/store";
import { useCallback } from "react";
import { useFetchVideosDashboard } from "@/features/Dashboard/lib";

export function useVideosDashboardQuery() {
  const { videosRequestBody: requestBody } = useVideosDashboard();

  const { data, loading, error, refetch } =
    useFetchVideosDashboard(requestBody);

  return {
    data: data?.fetchVideosDashboard,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchVideosDashboard() {
  const queryClient = useQueryClient();
  const { videosRequestBody: requestBody } = useVideosDashboard();

  return useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ["dashboard", "videos", requestBody],
    });
  }, [queryClient, requestBody]);
}
