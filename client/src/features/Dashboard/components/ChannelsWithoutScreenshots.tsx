import { useChannelsWithoutScreenshots } from "@/features/Channel/hooks/useChannelsWithoutScreenshots";
import Card from "../../../shared/components/card";
import CardsGridWrapper from "./CardsGridWrapper";

export default function ChannelsWithoutScreenshots() {
  const { data: channelsWithoutScreenshots } = useChannelsWithoutScreenshots();

  return (
    <CardsGridWrapper
      isLoading={!channelsWithoutScreenshots}
      isEmpty={!channelsWithoutScreenshots?.channels?.length}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2"
    >
      {channelsWithoutScreenshots?.channels?.map((channel) => (
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
    </CardsGridWrapper>
  );
}
