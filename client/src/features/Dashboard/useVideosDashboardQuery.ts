import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useVideosDashboard } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { VideosDashboardResponse } from "./types";
import { useCallback } from "react";

export function useVideosDashboardQuery() {
  const { videosRequestBody: requestBody } = useVideosDashboard();

  return useQuery<VideosDashboardResponse>({
    queryKey: ["dashboard", "videos", requestBody],
    queryFn: () =>
      nestFetcher<VideosDashboardResponse>({
        method: "POST",
        url: "/dashboard/videos",
        body: requestBody,
      }),
  });
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
