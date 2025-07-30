import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";
import { SortOrder } from "@/shared/types/searchParams";

const queryKey = ["useUploadsList"];

export default function useUploadsList(
  ytChannelId: string,
  sortOrder: SortOrder
) {
  return useQuery({
    queryKey: [...queryKey, ytChannelId, sortOrder],
    queryFn: () =>
      nestFetcher<{
        savedArtifactsCount: number;
        thumbnailArtifactsCount: number;
        screenshotArtifactsCount: number;
        groups: {
          id: number;
          name: string;
        }[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        ytId: string;
        src: string;
        videoCount: number;
        fetchStartVideoId: string;
        fetchedUntilEnd: boolean;
        uploads: {
          artifact: string;
          channelId: number;
          createdAt: string;
          duration?: number;
          id: number;
          nextPageToken: string | null;
          publishedAt: string;
          src: string;
          status: number;
          title: string;
          updatedAt: string;
          ytId: string;
          Storyboard: {
            fragments: number;
            url: string;
          } | null;
        }[];
      }>({
        url: `/uploads-video/uploads-list/${ytChannelId}?sortOrder=${sortOrder}`,
        method: "GET",
      }),
  });
}

export function useRefetchChannelUploads(ytChannelId: string | undefined) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    if (!ytChannelId) return;
    queryClient.refetchQueries({
      queryKey: [...queryKey, ytChannelId],
    });
  }, [queryClient, ytChannelId]);
}
