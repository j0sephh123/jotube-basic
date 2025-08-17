import { useQuery } from "@apollo/client";
import { UPLOADS_LIST } from "@/api/graphql/queries/queries";
import { useCallback, useMemo } from "react";
import { SortOrder } from "@/shared/types/searchParams";
import { useQueue } from "@/shared/hooks/useQueue";

type ChannelUploadsResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  ytId: string;
  src: string;
  videoCount: number;
  fetchStartVideoId: string;
  fetchedUntilEnd: boolean;
  lastSyncedAt: string | null;
  uploads: {
    artifact: string;
    channelId: number;
    createdAt: string;
    duration?: number;
    id: number;
    nextPageToken: string | null;
    publishedAt: string;
    src: string;
    title: string;
    updatedAt: string;
    ytId: string;
  }[];
};

export default function useUploadsList(
  ytChannelId: string,
  sortOrder: SortOrder
) {
  const queue = useQueue();

  const query = useQuery<{
    uploadsList: ChannelUploadsResponse;
  }>(UPLOADS_LIST, {
    variables: {
      uploadsListInput: {
        ytChannelId,
        sortOrder,
      },
    },
    skip: !ytChannelId,
    errorPolicy: "all",
  });

  const filteredData = useMemo(() => {
    const original = query.data?.uploadsList;
    if (!original) return original;
    const queuedIds = new Set((queue.data ?? []).map((q) => q.ytVideoId));
    return {
      ...original,
      uploads: original.uploads.filter((u) => !queuedIds.has(u.ytId)),
    } as ChannelUploadsResponse;
  }, [query.data?.uploadsList, queue.data]);

  return {
    ...query,
    data: filteredData,
    isLoading: query.loading,
    error: query.error,
  };
}

export function useRefetchChannelUploads(ytChannelId: string | undefined) {
  return useCallback(() => {
    if (!ytChannelId) return;
    // This will be handled by the GraphQL query refetch
  }, [ytChannelId]);
}
