import { useChannelsWithoutUploads } from "@/features/Channel/hooks/useChannelsWithoutUploads";
import ChannelCard from "@/features/Channel/NewChannel/components/ChannelCard";

export default function ChannelsWithoutUploadsPage(): JSX.Element {
  const { data, refetch } = useChannelsWithoutUploads("createdAt", "desc");

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {data.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onRefetch={refetch}
            showActions={true}
            clickable={false}
          />
        ))}
      </div>
    </div>
  );
}
