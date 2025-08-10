import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { VideosDashboardResponse } from "./types";
import { useCallback } from "react";

export function useVideosDashboardQuery() {
  const { videosRequestBody } = useStore();

  const requestBody = {
    page: videosRequestBody.page,
    sortOrder: videosRequestBody.sortOrder,
    screenshotMin: videosRequestBody.minScreenshots,
    screenshotMax: videosRequestBody.maxScreenshots,
  };

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
  const { videosRequestBody } = useStore();

  return useCallback(() => {
    const requestBody = {
      page: videosRequestBody.page,
      sortOrder: videosRequestBody.sortOrder,
      screenshotMin: videosRequestBody.minScreenshots,
      screenshotMax: videosRequestBody.maxScreenshots,
    };
    queryClient.refetchQueries({
      queryKey: ["dashboard", "videos", requestBody],
    });
  }, [queryClient, videosRequestBody]);
}
