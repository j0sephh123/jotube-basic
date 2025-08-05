import Card from "../../../../shared/components/card";
import CardsGridWrapper from "../../components/CardsGridWrapper";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";
import { useNoUploadsOrScreenshotsView } from "./useNoUploadsOrScreenshotsView";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import { DashboardChannel } from "../types";

type ChannelWithUploadsCount = DashboardChannel & { uploadsCount: number };

export default function NoUploadsOrScreenshotsView() {
  const { data } = useNoUploadsOrScreenshotsView();
  const viewType = useTypedViewType();

  const isThumbnailsView = viewType === ViewType.THUMBNAILS;

  let channels: (DashboardChannel | ChannelWithUploadsCount)[] = [];
  let isEmpty = !data;

  if (data) {
    if (isThumbnailsView && "thumbnailChannels" in data) {
      channels = data.thumbnailChannels;
      isEmpty = !channels.length;
    } else if (Array.isArray(data)) {
      channels = data;
      isEmpty = !channels.length;
    }
  }

  return (
    <CardsGridWrapper isLoading={!data} isEmpty={isEmpty}>
      {channels.map((channel) => (
        <Card
          key={channel.id}
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
          deleteButtonSlot={<DeleteChannel id={channel.id} />}
          actionButtonSlot={
            !isThumbnailsView &&
            "videoCount" in channel && (
              <FetchUploadsButton
                ytChannelId={channel.ytId}
                videoCount={channel.videoCount}
              />
            )
          }
        />
      ))}
    </CardsGridWrapper>
  );
}
