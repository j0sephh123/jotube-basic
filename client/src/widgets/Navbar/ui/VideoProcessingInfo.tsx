import { useState, useEffect } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Video, Loader, X } from "lucide-react";
import { useRemoveFromQueue } from "@features/Upload";
import { useQueue } from "@shared/hooks";
import { getWaitingJobIds, groupByChannel } from "@shared/utils";
import { ChannelLink } from "@shared/ui";

export default function VideoProcessingInfo() {
  const { data: queueData = [], refetch: refetchQueue, isLoading } = useQueue();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const intervalId = setInterval(() => {
      setIsRefreshing(true);
      refetchQueue().finally(() => setIsRefreshing(false));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isOpen, refetchQueue]);

  const hasItems = queueData.length > 0;
  const hasWaitingItems = queueData.some((item) => item.state === "waiting");

  const removeFromQueueMutation = useRemoveFromQueue();

  const handleRemoveJob = (id: string): void => {
    removeFromQueueMutation([id]).then(() => refetchQueue());
  };

  const handleCancelAll = async () => {
    const waitingJobIds = getWaitingJobIds(queueData);

    if (waitingJobIds.length > 0) {
      await removeFromQueueMutation(waitingJobIds);
      refetchQueue();
    }
  };

  const handleCancelChannel = async (channelId: string) => {
    const waitingJobIds = queueData
      .filter(
        (item) => item.ytChannelId === channelId && item.state === "waiting"
      )
      .map((item) => item.id);

    if (waitingJobIds.length > 0) {
      await removeFromQueueMutation(waitingJobIds);
      refetchQueue();
    }
  };

  const groupedByChannel = groupByChannel(queueData);

  const truncateId = (id: string, maxLength = 12): string => {
    if (id.length <= maxLength) return id;
    return id.substring(0, maxLength) + "...";
  };

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button className="btn btn-ghost btn-circle relative">
          <Video className="h-5 w-5" />
          {hasItems && (
            <span className="absolute -top-1 -right-1 badge badge-xs badge-primary rounded-full">
              {queueData.length}
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[400px] max-h-[500px] overflow-auto z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              Processing Queue
              {isRefreshing && (
                <Loader size={16} className="animate-spin text-blue-400" />
              )}
            </h3>
            {hasWaitingItems && (
              <button
                onClick={handleCancelAll}
                className="btn btn-sm btn-error"
              >
                Cancel All Waiting
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="w-6 h-6 animate-spin text-blue-400" />
            </div>
          ) : !hasItems ? (
            <p className="text-zinc-400">No videos in queue</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedByChannel).map(([channelId, items]) => {
                const activeCount = items.filter(
                  (i) => i.state === "active"
                ).length;
                const waitingCount = items.filter(
                  (i) => i.state === "waiting"
                ).length;

                return (
                  <div
                    key={channelId}
                    className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-800/30"
                  >
                    <div className="bg-zinc-800 px-3 py-2">
                      <div className="flex justify-between items-center">
                        <ChannelLink
                          ytId={channelId}
                          where="saved"
                          className="text-blue-400 hover:underline font-medium truncate max-w-[220px]"
                        >
                          {items[0]?.channelTitle || truncateId(channelId, 16)}
                        </ChannelLink>
                        <div className="flex items-center gap-2">
                          <span className="badge badge-sm badge-outline">
                            {activeCount} active / {waitingCount} waiting
                          </span>
                          {/* {waitingCount > 0 && ( */}
                          <button
                            onClick={() => handleCancelChannel(channelId)}
                            className="btn btn-error btn-xs p-0 h-6 w-6 min-h-0 flex items-center justify-center"
                            title="Cancel all waiting jobs for this channel"
                          >
                            <X size={12} />
                          </button>
                          {/* )} */}
                        </div>
                      </div>
                    </div>

                    <ul className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
                      {items.map((item) => {
                        const isActive = item.state === "active";

                        return (
                          <li
                            key={item.id}
                            className={`border-t border-zinc-700/50 px-3 py-1.5 flex justify-between items-center ${
                              isActive ? "bg-zinc-800/70" : ""
                            }`}
                          >
                            <div className="flex flex-col">
                              <span
                                className="text-sm text-white truncate max-w-[220px]"
                                title={`${item.videoTitle || ""} (${
                                  item.ytVideoId
                                })`}
                              >
                                {item.videoTitle || truncateId(item.ytVideoId)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  isActive
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-zinc-700/50 text-zinc-300"
                                }`}
                              >
                                {item.state}
                              </span>
                              {!isActive && (
                                <button
                                  onClick={() => handleRemoveJob(item.id)}
                                  className="btn btn-error btn-xs px-1 h-5 min-h-0"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
