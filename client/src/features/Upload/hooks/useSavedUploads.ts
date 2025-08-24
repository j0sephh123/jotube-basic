import { useApolloClient } from "@apollo/client";
import { SavedUploadsDocument, useSavedUploadsQuery } from "@shared/api";
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
  const apolloClient = useApolloClient();

  return useCallback(() => {
    if (!ytChannelId) return;
    apolloClient.refetchQueries({
      include: [SavedUploadsDocument],
    });
  }, [apolloClient, ytChannelId]);
}
