import { Button, CustomLink } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { ChevronRight, X } from "lucide-react";
import { type QueueItem } from "@shared/hooks";
import { VideoItem } from "./VideoItem";
import { useState } from "react";
import clsx from "clsx";

export function ChannelItem({
  channelId,
  items,
  activeCount,
  waitingCount,
  handleCancelChannel,
  handleRemoveJob,
}: {
  channelId: string;
  items: QueueItem[];
  activeCount: number;
  waitingCount: number;
  handleCancelChannel: (channelId: string) => void;
  handleRemoveJob: (id: string) => void;
}) {
  const [areItemsOpen, setAreItemsOpen] = useState(true);

  const sortedItems = items.sort((a, b) => {
    if (a.state === "active") {
      return -1;
    } else if (b.state === "active") {
      return 1;
    }
    return 0;
  });

  return (
    <div className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-800/30">
      <div className="bg-zinc-800 px-3 py-2">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex gap-4">
            <ChevronRight
              className={clsx("hover:bg-zinc-600/50 transition-colors", {
                "rotate-90": areItemsOpen,
              })}
              onClick={() => setAreItemsOpen(!areItemsOpen)}
            />
            <CustomLink
              to={`/channels/${makeYtChannelId(channelId)}/saved`}
              className="text-blue-400 hover:underline font-medium truncate max-w-[220px]"
            >
              {items[0]?.channelTitle}
            </CustomLink>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-sm badge-outline">
              {activeCount} active / {waitingCount} waiting
            </span>
            <Button
              onClick={() => handleCancelChannel(channelId)}
              className="btn btn-error btn-xs p-0 h-6 w-6 min-h-0 flex items-center justify-center"
              title="Cancel all waiting jobs for this channel"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      </div>
      {areItemsOpen && (
        <ul className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
          {sortedItems.map((item) => (
            <VideoItem
              key={item.id}
              item={item}
              isActive={item.state === "active"}
              handleRemoveJob={handleRemoveJob}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
