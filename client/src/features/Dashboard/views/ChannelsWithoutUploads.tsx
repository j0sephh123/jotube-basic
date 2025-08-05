import { useChannelsWithoutUploads } from "@/features/Channel/hooks/useChannelsWithoutUploads";
import Card from "../../../shared/components/card";
import CardsGridWrapper from "../components/CardsGridWrapper";

export default function ChannelsWithoutUploads() {
  const { data: channelsWithoutUploads } = useChannelsWithoutUploads();

  return (
    <CardsGridWrapper
      isLoading={!channelsWithoutUploads}
      isEmpty={!channelsWithoutUploads?.length}
    >
      {channelsWithoutUploads?.map((channel) => (
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
    </CardsGridWrapper>
  );
}
