import { useQueue } from "@shared/hooks";
import type { QueueItem } from "@shared/hooks";
import { groupByChannel } from "./utils";
import { useMemo } from "react";

export default function useGroupByChannel(): [string, QueueItem[]][] {
  const { data: queueData = [] } = useQueue();

  return useMemo(() => {
    const queueArray = Array.isArray(queueData) ? queueData : [];
    return Object.entries(groupByChannel(queueArray));
  }, [queueData]);
}
