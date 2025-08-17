import { useQuery } from "@apollo/client";
import { SAVED_UPLOADS } from "@/api/graphql/queries/queries";
import { useCallback } from "react";

type Upload = {
  createdAt: string;
  ytId: string;
  id: number;
  duration: number | null;
  publishedAt: string;
  src: string;
  title: string;
  artifact:
    | "VIDEO"
    | "PREVIEW"
    | "SAVED"
    | "DOWNLOADED"
    | "THUMBNAIL"
    | "SCREENSHOT";
};

type Channel = {
  id: number;
  title: string;
  src: string;
  ytId: string;
  uploads: Upload[];
  totalUploads: number;
};

type YouTubeChannelResponse = {
  ytChannelId: string;
  channel: Channel | null;
  uploads: Upload[];
  totalUploads: number;
};

export function useSavedUploads(ytChannelId: string) {
  const { data, loading, error, refetch } = useQuery<{
    savedUploads: YouTubeChannelResponse[];
  }>(SAVED_UPLOADS, {
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
