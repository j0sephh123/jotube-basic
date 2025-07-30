import { useChannelsWithoutUploads } from "@/features/Channel/hooks/useChannelsWithoutUploads";
import ChannelCard from "@/features/Channel/NewChannel/components/ChannelCard";
import NewChannelsFilters from "@/features/Channel/NewChannel/components/Filters";
import useChannelsWithoutUploadsFilters from "@/features/Channel/NewChannel/hooks/useChannelsWithoutUploadsFilters";

export default function ChannelsWithoutUploadsPage(): JSX.Element {
  const { sortField, direction } = useChannelsWithoutUploadsFilters();
  const { data, refetch } = useChannelsWithoutUploads(sortField, direction);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-auto mt-16">
      <NewChannelsFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {data.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onRefetch={refetch} />
        ))}
      </div>
    </div>
  );
}
