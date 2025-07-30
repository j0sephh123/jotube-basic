import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";

export type ThumbnailByVideoIdResponse = {
  createdAt: string;
  id: string;
  perRow: number;
  updatedAt: string;
  uploadsVideoId: number;
  totalSeconds: number;
  thumbnailsCount: number;
};

export function useThumbnailByVideoId(ytVideoId: string) {
  return useQuery<ThumbnailByVideoIdResponse>({
    queryKey: ["thumbnails", "getByYtVideoId", ytVideoId],
    queryFn: () =>
      nestFetcher({
        url: `/thumbnails-api/getByYtVideoId/${ytVideoId}`,
        method: "GET",
      }),
    enabled: ytVideoId.length > 0,
  });
}

export function useRefetchThumbnailByVideoId(ytVideoId: string | undefined) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    if (!ytVideoId) return;
    queryClient.refetchQueries({
      queryKey: ["thumbnails", "getByYtVideoId", ytVideoId],
    });
  }, [queryClient, ytVideoId]);
  }