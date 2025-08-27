import type { SortOrder } from "@shared/api";
import { UploadsListDocument, useUploadsListQuery } from "@shared/api";
import { useCallback, useMemo } from "react";
import { useQueue } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

export function useUploads(ytChannelId: string, type: "default" | "saved") {
  console.log({
    type,
  });
  const queue = useQueue();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;

  const query = useUploadsListQuery({
    variables: {
      uploadsListInput: {
        ytChannelId,
        sortOrder,
        type,
        take: 50,
      },
    },
    skip: !ytChannelId,
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

export function useRefetchChannelUploads(ytChannelId: string | undefined) {
  const apolloClient = useApolloClient();

  return useCallback(() => {
    if (!ytChannelId) return;
    apolloClient.refetchQueries({
      include: [UploadsListDocument],
    });
  }, [apolloClient, ytChannelId]);
}
