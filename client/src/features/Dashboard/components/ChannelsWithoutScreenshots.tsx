import { useChannelsWithoutScreenshots } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";
import ChannelCard from "@/features/Channel/NewChannel/components/ChannelCard";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {channelsWithoutScreenshots.channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              showActions={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
