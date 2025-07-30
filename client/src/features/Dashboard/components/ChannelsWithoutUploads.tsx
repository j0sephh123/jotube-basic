import { useChannelsWithoutUploads } from "@/features/Channel/hooks/useChannelsWithoutUploads";
import ChannelCard from "@/features/Channel/NewChannel/components/ChannelCard";

export default function ChannelsWithoutUploads() {
  const {
    data: channelsWithoutUploads,
    refetch: refetchChannelsWithoutUploads,
  } = useChannelsWithoutUploads();

  if (!channelsWithoutUploads) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {channelsWithoutUploads.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onRefetch={refetchChannelsWithoutUploads}
            showActions={true}
            clickable={false}
          />
        ))}
      </div>
    </div>
  );
}
