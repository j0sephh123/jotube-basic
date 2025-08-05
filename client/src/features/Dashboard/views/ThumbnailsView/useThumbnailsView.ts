import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";
import { DashboardChannel } from "../types";

type Item = DashboardChannel & { uploadsCount: number };

type Response = {
  thumbnailChannelIds: number[];
  thumbnailChannels: Item[];
};

export function useThumbnailsView() {
  return useQuery({
    queryKey: ["thumbnails-view"],
    queryFn: () =>
      nestFetcher<Response>({
        url: "/dashboard/thumbnails-view",
        method: "GET",
      }),
  });
}

export function useRefetchGroupedThumbnails() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.refetchQueries({ queryKey: ["thumbnails-view"] });
  }, [queryClient]);
}
