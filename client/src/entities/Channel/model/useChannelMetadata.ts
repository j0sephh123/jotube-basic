import {
  useGetChannelMetadataQuery,
  useGetChannelMetadataLazyQuery,
} from "@/shared/api/generated/graphql";
import { useCallback } from "react";

export function useChannelMetadataQuery(ytChannelId: string | undefined) {
  const { data, loading, error, refetch } = useGetChannelMetadataQuery({
    variables: { ytChannelId: ytChannelId || "" },
    skip: !ytChannelId,
  });

  return {
    data: data?.channelMetadata,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchChannelMetadata() {
  const [refetchQuery] = useGetChannelMetadataLazyQuery();

  return useCallback(
    (ytChannelId: string | undefined) => {
      if (!ytChannelId) return;
      refetchQuery({ variables: { ytChannelId } });
    },
    [refetchQuery]
  );
}
