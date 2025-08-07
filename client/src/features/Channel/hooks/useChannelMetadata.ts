import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useCallback } from "react";

export type ChannelMetadataI = {
  videoArtifactsCount: number;
  savedArtifactsCount: number;
  thumbnailArtifactsCount: number;
  screenshotArtifactsCount: number;
  storyboardArtifactsCount: number;
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
  return useQuery<ChannelMetadataI>({
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
