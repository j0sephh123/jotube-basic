import { useNoUploadsView, useRefetchNoUploadsView } from "@/features/Dashboard/views/NoUploadsView/useNoUploadsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";

export default function NoUploadsView() {
  const { data: channelsWithoutUploads } = useNoUploadsView();
  const refetchNoUploadsView = useRefetchNoUploadsView();
  return (
    <CardsGridWrapper
      isLoading={!channelsWithoutUploads}
      isEmpty={!channelsWithoutUploads?.length}
    >
      {channelsWithoutUploads?.map((channel) => (
        <div key={channel.id} className="relative">
          <Card
            id={channel.id}
            ytId={channel.ytId}
            title={channel.title}
            src={channel.src}
            showSyncButton={false}
            showActionButtons={false}
          />
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <FetchUploadsButton
              ytChannelId={channel.ytId}
              videoCount={channel.videoCount}
            />
            <DeleteChannel
              id={channel.id}
              onSuccess={() => {
                refetchNoUploadsView();
              }}
            />
          </div>
        </div>
      ))}
    </CardsGridWrapper>
  );
}
