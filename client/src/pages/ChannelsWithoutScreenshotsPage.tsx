import { useSearchParams } from "react-router-dom";
import { useChannelsWithoutScreenshots } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";
import ChannelCard from "@/features/Channel/NewChannel/components/ChannelCard";

export default function ChannelsWithoutScreenshotsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = 20;
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

  const { data } = useChannelsWithoutScreenshots({ page, perPage, sortOrder });

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
          {data.channels.map((channel) => (
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
