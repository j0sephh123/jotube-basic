import { useQuery } from "@tanstack/react-query";
import { getDistinctChannelIds } from "@/shared/utils/utils";
import nestFetcher from "@/shared/api/nestFetcher";
export type QueueItem = {
  id: string;
  ytChannelId: string;
  ytVideoId: string;
  state: "active" | "waiting";
};

// Suboptimal solution, will be replaced with SSE or WS
export function useQueue() {
  const queue = useQuery({
    refetchInterval: 5000,
    queryKey: ["queue"],
    queryFn: async () => {
      const queueData = await nestFetcher<QueueItem[]>({
        url: "/queues/queue",
        method: "GET",
      });
      return queueData;
    },
  });

  return {
    ...queue,
    queueDistinctChannelIds: getDistinctChannelIds(queue.data ?? []),
  };
}
