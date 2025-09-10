import { useState } from "react";
import { useQueue } from "@shared/hooks";
import { Button } from "@shared/ui";
import useActions from "./useActions";
import VideoProcessingInfoWrapper from "./Wrapper";
import { useSettingsQuery } from "@features/Settings";
import { AutoDownload } from "@widgets/Settings";
import { useGetProcessingReadyUploadsQuery } from "@shared/api/generated/graphql";
import { AutoDlEnabledSection, AutoDLLabel, NoVideosFound } from "./static";
import { ChannelItem } from "./ChannelItem";
import useGroupByChannel from "./useGroupByChannel";

export default function VideoProcessingInfo() {
  const { data: queueData = [] } = useQueue();

  const [isOpen, setIsOpen] = useState(false);
  const { data: { autoDownload = false } = {} } = useSettingsQuery();

  const queueArray = Array.isArray(queueData) ? queueData : [];
  const hasItems = queueArray.length > 0;
  const hasWaitingItems = queueArray.some((item) => item.state === "waiting");

  const { handleCancelAll, handleRemoveJob, handleCancelChannel } =
    useActions();

  const groupedByChannel = useGroupByChannel();

  const { data: { getProcessingReadyUploads: { count = 0 } = {} } = {} } =
    useGetProcessingReadyUploadsQuery();

  return (
    <VideoProcessingInfoWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      queueData={queueArray}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Video Processing</h3>
          {autoDownload && <AutoDLLabel />}
        </div>
        {hasWaitingItems && (
          <Button onClick={handleCancelAll} className="btn btn-sm btn-error">
            Cancel All Waiting
          </Button>
        )}
      </div>
      {autoDownload && <AutoDlEnabledSection />}
      <AutoDownload availableVideos={count} />
      <div className="space-y-3">
        {hasItems ? (
          groupedByChannel.map(([channelId, items]) => (
            <ChannelItem
              handleRemoveJob={handleRemoveJob}
              key={channelId}
              channelId={channelId}
              items={items}
              activeCount={items.filter((i) => i.state === "active").length}
              waitingCount={items.filter((i) => i.state === "waiting").length}
              handleCancelChannel={handleCancelChannel}
            />
          ))
        ) : (
          <NoVideosFound />
        )}
      </div>
    </VideoProcessingInfoWrapper>
  );
}
