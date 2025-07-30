import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";

type Response = {
  videoArtifactsCount: number;
  savedArtifactsCount: number;
  thumbnailArtifactsCount: number;
  screenshotArtifactsCount: number;
  id: number;
  title: string;
  ytId: string;
  src: string;
  fetchedUntilEnd: boolean;
  videoCount: number;
  lastSyncedAt: string | null;
};

const queryKey = (ytChannelId: string | undefined) => [
  "useChannelMetadata",
  ytChannelId,
];

export function useChannelMetadataQuery(ytChannelId: string | undefined) {
  return useQuery<Response>({
    enabled: !!ytChannelId,
    queryKey: queryKey(ytChannelId),
    queryFn: () =>
      nestFetcher({
        url: `/channel/metadata/${ytChannelId}`,
        method: "GET",
      }),
  });
}

export function useRefetchChannelMetadata() {
  const queryClient = useQueryClient();

  return useCallback(
    (ytChannelId: string | undefined) => {
      if (!ytChannelId) return;
      queryClient.refetchQueries({ queryKey: queryKey(ytChannelId) });
    },
    [queryClient]
  );
}
