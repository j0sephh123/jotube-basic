import type { SortOrder } from "@shared/api";
import { UploadsListDocument, useUploadsListQuery } from "@shared/api";
import { useCallback, useMemo } from "react";
import { useQueue } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { type UploadsType } from "../types";

export function useUploads(channelId: number, type: UploadsType) {
  const queue = useQueue();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;

  const query = useUploadsListQuery({
    variables: {
      uploadsListInput: {
        channelId,
        sortOrder,
        type,
        take: 50,
      },
    },
  });

  const filteredData = useMemo(() => {
    const original = query.data?.uploadsList;
    if (!original) return original;
    const queuedIds = new Set((queue.data ?? []).map((q) => q.ytVideoId));
    return {
      ...original,
      uploads: original.uploads.filter((u) => !queuedIds.has(u.ytId)),
    };
  }, [query.data?.uploadsList, queue.data]);

  return {
    ...query,
    data: filteredData,
    isLoading: query.loading,
    error: query.error,
  };
}

export function useRefetchChannelUploads() {
  const apolloClient = useApolloClient();

  return useCallback(() => {
    apolloClient.refetchQueries({
      include: [UploadsListDocument],
    });
  }, [apolloClient]);
}
