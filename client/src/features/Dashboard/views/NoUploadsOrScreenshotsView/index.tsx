import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";
import { useNoUploadsOrScreenshotsView } from "./useNoUploadsOrScreenshotsView";

export default function NoUploadsOrScreenshotsView() {
  const { data } = useNoUploadsOrScreenshotsView();

  return (
    <CardsGridWrapper isLoading={!data} isEmpty={!data?.length}>
      {data?.map((channel) => (
        <Card
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
          deleteButtonSlot={<DeleteChannel id={channel.id} />}
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
