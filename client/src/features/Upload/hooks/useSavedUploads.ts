import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
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
};

type YouTubeChannelResponse = {
  ytChannelId: string;
  channel: Channel;
};

const queryKey = (ytChannelId: string) => ["savedUploads", ytChannelId];

export function useSavedUploads(ytChannelId: string) {
  return useQuery<YouTubeChannelResponse[]>({
    queryKey: queryKey(ytChannelId),
    queryFn: () =>
      nestFetcher<YouTubeChannelResponse[]>({
        url: "/uploads-video/saved-uploads",
        method: "POST",
        body: {
          ytChannelIds: [ytChannelId],
        },
      }),
    enabled: !!ytChannelId,
  });
}

export function useRefetchSavedUploads(ytChannelId: string) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    if (!ytChannelId) return;
    queryClient.refetchQueries({ queryKey: queryKey(ytChannelId) });
  }, [queryClient, ytChannelId]);
}
