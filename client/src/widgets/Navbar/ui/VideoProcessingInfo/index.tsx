import { useState } from "react";
import { X, Zap, Video } from "lucide-react";
import { useQueue } from "@shared/hooks";
import { Button, CustomLink } from "@shared/ui";
import useActions from "./useActions";
import VideoProcessingInfoWrapper from "./Wrapper";
import useGroupByChannel from "./useGroupByChannel";
import { makeYtChannelId } from "@shared/types";
import { useSettingsQuery } from "@features/Settings";
import { AutoDownload } from "@widgets/Settings";

export default function VideoProcessingInfo() {
  const { data: queueData = [] } = useQueue();
  const [isOpen, setIsOpen] = useState(false);
  const { data: { autoDownload = false } = {} } = useSettingsQuery();

  const hasItems = queueData.length > 0;
  const hasWaitingItems = queueData.some((item) => item.state === "waiting");

  const { handleCancelAll, handleRemoveJob, handleCancelChannel } =
    useActions();

  const groupedByChannel = useGroupByChannel();

  return (
    <VideoProcessingInfoWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      queueData={queueData}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Video Processing</h3>
          {autoDownload && (
            <div className="badge badge-warning gap-1">
              <Zap className="h-3 w-3" />
              <span>Auto Download</span>
            </div>
          )}
        </div>
        {hasWaitingItems && (
          <Button onClick={handleCancelAll} className="btn btn-sm btn-error">
            Cancel All Waiting
          </Button>
        )}
      </div>
      {autoDownload && (
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-md p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-300">
            <Zap className="h-4 w-4" />
            <span className="text-sm">
              Auto Download is enabled - videos will be automatically processed
            </span>
          </div>
        </div>
      )}
      <div className="border-t border-zinc-700 pt-4 mb-4">
        <AutoDownload />
      </div>
      <div className="space-y-3">
        {hasItems ? (
          groupedByChannel.map(([channelId, items]) => {
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
                    <CustomLink
                      to={`/channels/${makeYtChannelId(channelId)}/saved`}
                      className="text-blue-400 hover:underline font-medium truncate max-w-[220px]"
                    >
                      {items[0]?.channelTitle}
                    </CustomLink>
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
                            {item.videoTitle}
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
          })
        ) : (
          <div className="text-center py-8 text-zinc-400">
            <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No videos in processing queue</p>
            <p className="text-xs mt-1">
              Videos will appear here when they're being processed
            </p>
          </div>
        )}
      </div>
    </VideoProcessingInfoWrapper>
  );
}
