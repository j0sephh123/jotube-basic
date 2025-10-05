import { useQuery, useQueryClient } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";
import type { Phase } from "@shared/api/generated/graphql";

export type QueueItem = {
  id: string;
  processingType: "download" | "storyboarding" | "processing";
  state: "active" | "waiting";
  ytChannelId: string;
  ytVideoId: string;
  videoTitle: string;
  channelTitle: string;
  videoId: number;
  phases?: {
    id: number;
    createdAt: Date;
    uploadsVideoId: number;
    phase: Phase;
    endedAt: Date | null;
  }[];
};

export function useQueue() {
  return useQuery({
    refetchInterval: 5000,
    queryKey: ["queue"],
    queryFn: () =>
      nestFetcher<QueueItem[]>({
        url: "/queues/queue",
        method: "GET",
      }),
  });
}

export function useRefetchQueue() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.refetchQueries({ queryKey: ["queue"] });
  };
}
