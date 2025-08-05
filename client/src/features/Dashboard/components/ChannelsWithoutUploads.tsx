import { useChannelsWithoutUploads } from "@/features/Channel/hooks/useChannelsWithoutUploads";
import Card from "../../../shared/components/card";

export default function ChannelsWithoutUploads() {
  const { data: channelsWithoutUploads } = useChannelsWithoutUploads();

  if (!channelsWithoutUploads) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {channelsWithoutUploads.map((channel) => (
            <Card
              key={channel.id}
              id={channel.id}
              ytId={channel.ytId}
              title={channel.title}
              src={channel.src}
              thumbnails={channel.videoCount}
              showSyncButton={false}
              showCardMenu={false}
              showStats={true}
              showActionButtons={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
