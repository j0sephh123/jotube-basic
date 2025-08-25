import { useQueue } from "@shared/hooks";
import { groupByChannel } from "./utils";
import { useMemo } from "react";

export default function useGroupByChannel() {
  const { data: queueData = [] } = useQueue();

  return useMemo(() => {
    return Object.entries(groupByChannel(queueData));
  }, [queueData]);
}