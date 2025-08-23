import { useQuery, useQueryClient } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export type QueueItem = {
  id: string;
  ytChannelId: string;
  ytVideoId: string;
  state: "active" | "waiting";
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
