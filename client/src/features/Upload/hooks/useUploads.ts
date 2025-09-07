import type {
  SortOrder,
  UploadsListInput,
  UploadsListQueryResult,
} from "@shared/api";
import { UploadsListDocument, useUploadsListQuery } from "@shared/api";
import { useCallback, useMemo } from "react";
import { useQueue } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { type UploadsType } from "@shared/types";

export function useUploads({
  id,
  uploadsType,
}: {
  id: UploadsListInput["id"];
  uploadsType: UploadsType;
}) {
  const queue = useQueue();
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;

  const query = useUploadsListQuery({
    variables: {
      uploadsListInput: {
        id,
        sortOrder,
        type: uploadsType,
        take: 150,
      },
    },
  });

  const filteredData = useMemo<UploadsListQueryResult["data"]>(() => {
    const original = query.data;
    if (!original) return original;
    const queuedIds = new Set((queue.data ?? []).map((q) => q.ytVideoId));
    return {
      ...original,
      uploadsList: original.uploadsList.filter((u) => !queuedIds.has(u.ytId)),
    };
  }, [query.data, queue.data]);

  return {
    data: filteredData,
    isLoading: query.loading,
    error: query.error,
    refetch: query.refetch,
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
