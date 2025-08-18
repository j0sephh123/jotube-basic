import { useSavedUploadsQuery } from "@/shared/api/generated/graphql";
import { useCallback } from "react";

export function useSavedUploads(ytChannelId: string) {
  const { data, loading, error, refetch } = useSavedUploadsQuery({
    variables: {
      savedUploadsInput: {
        ytChannelIds: [ytChannelId],
      },
    },
    skip: !ytChannelId,
  });

  return {
    data: data?.savedUploads,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchSavedUploads(ytChannelId: string) {
  return useCallback(() => {
    if (!ytChannelId) return;
    // This will be handled by the GraphQL query refetch
  }, [ytChannelId]);
}
