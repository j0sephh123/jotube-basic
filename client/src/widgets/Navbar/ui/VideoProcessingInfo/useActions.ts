import { useRemoveFromQueue } from "@features/Upload";
import { useQueue } from "@shared/hooks";
import { getWaitingJobIds } from "./utils";

export default function useActions() {
  const handleRemoveJob = (id: string): void => {
    removeFromQueueMutation([id]).then(() => refetchQueue());
  };

  const { data: queueData = [], refetch: refetchQueue } = useQueue();
  const removeFromQueueMutation = useRemoveFromQueue();

  const handleCancelAll = async () => {
    const queueArray = Array.isArray(queueData) ? queueData : [];
    const waitingJobIds = getWaitingJobIds(queueArray);

    if (waitingJobIds.length > 0) {
      await removeFromQueueMutation(waitingJobIds);
      refetchQueue();
    }
  };

  const handleCancelChannel = async (channelId: string) => {
    const queueArray = Array.isArray(queueData) ? queueData : [];
    const waitingJobIds = queueArray
      .filter(
        (item) => item.ytChannelId === channelId && item.state === "waiting"
      )
      .map((item) => item.id);

    if (waitingJobIds.length > 0) {
      await removeFromQueueMutation(waitingJobIds);
      refetchQueue();
    }
  };

  return {
    handleCancelAll,
    handleRemoveJob,
    handleCancelChannel,
  };
}
