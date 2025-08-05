import { useNoUploadsView } from "@/features/Dashboard/views/NoUploadsView/useNoUploadsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";

export default function NoUploadsView() {
  const { data: channelsWithoutUploads } = useNoUploadsView();

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
