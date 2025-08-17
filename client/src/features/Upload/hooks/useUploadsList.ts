import { useUploadsListQuery, SortOrder } from "@/generated/graphql";
import { useCallback, useMemo } from "react";
import { useQueue } from "@/shared/hooks/useQueue";

export default function useUploadsList(
  ytChannelId: string,
  sortOrder: SortOrder
) {
  const queue = useQueue();

  const query = useUploadsListQuery({
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
  return useCallback(() => {
    if (!ytChannelId) return;
    // This will be handled by the GraphQL query refetch
  }, [ytChannelId]);
}
