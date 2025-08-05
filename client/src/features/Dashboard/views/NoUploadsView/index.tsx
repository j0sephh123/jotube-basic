import {
  useNoUploadsView,
  useRefetchNoUploadsView,
} from "@/features/Dashboard/views/NoUploadsView/useNoUploadsView";
import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";

export default function NoUploadsView() {
  const { data } = useNoUploadsView();
  const refetchNoUploadsView = useRefetchNoUploadsView();

  return (
    <CardsGridWrapper
      isLoading={!data}
      isEmpty={!data?.length}
    >
      {data?.map((channel) => (
        <Card
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
          deleteButtonSlot={
            <DeleteChannel
              id={channel.id}
              onSuccess={() => {
                refetchNoUploadsView();
              }}
            />
          }
          actionButtonSlot={
            <FetchUploadsButton
              ytChannelId={channel.ytId}
              videoCount={channel.videoCount}
            />
          }
        />
      ))}
    </CardsGridWrapper>
  );
}
