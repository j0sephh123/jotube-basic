import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback, useMemo } from "react";
import { SortOrder } from "@/shared/types/searchParams";
import { useQueue } from "@/shared/hooks/useQueue";

const queryKey = ["useUploadsList"];

type ChannelUploadsResponse = {
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
};

export default function useUploadsList(
  ytChannelId: string,
  sortOrder: SortOrder
) {
  const queue = useQueue();

  const query = useQuery({
    queryKey: [...queryKey, ytChannelId, sortOrder],
    queryFn: () =>
      nestFetcher<ChannelUploadsResponse>({
        url: `/uploads-video/uploads-list/${ytChannelId}?sortOrder=${sortOrder}`,
        method: "GET",
      }),
  });

  const filteredData = useMemo(() => {
    const original = query.data;
    if (!original) return original;
    const queuedIds = new Set((queue.data ?? []).map((q) => q.ytVideoId));
    return {
      ...original,
      uploads: original.uploads.filter((u) => !queuedIds.has(u.ytId)),
    } as ChannelUploadsResponse;
  }, [query.data, queue.data]);

  return { ...query, data: filteredData };
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
