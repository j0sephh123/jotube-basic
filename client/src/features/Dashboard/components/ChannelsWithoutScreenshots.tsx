import { useChannelsWithoutScreenshots } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";
import Card from "../../../shared/components/card";

export default function ChannelsWithoutScreenshots() {
  const { data: channelsWithoutScreenshots } = useChannelsWithoutScreenshots();

  if (!channelsWithoutScreenshots) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
          {channelsWithoutScreenshots.channels.map((channel) => (
            <Card
              key={channel.id}
              id={channel.id}
              ytId={channel.ytId}
              title={channel.title}
              src={channel.src}
              showSyncButton={false}
              showCardMenu={false}
              showStats={false}
              showActionButtons={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
