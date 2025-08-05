import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";

export function useThumbnailsView() {
  return useQuery({
    queryKey: ["thumbnails-view"],
    queryFn: () =>
      nestFetcher<{
        thumbnailChannelIds: number[];
        thumbnailChannels: Array<{
          id: number;
          ytId: string;
          title: string;
          src: string;
          uploadsCount: number;
        }>;
      }>({
        url: "/thumbnails-api/thumbnails-view",
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
