import { DashboardChannel } from "./types";
import { ViewType } from "@/shared/hooks/useTypedParams";
import SyncUploadsButton from "../Upload/components/SyncUploadsButton";
import Card from "@/shared/components/card";
import FetchUploadsButton from "../Upload/components/FetchUploadsButton";
import DeleteChannel from "../Channel/NewChannel/components/DeleteChannel";

interface DashboardCardProps {
  channel: DashboardChannel;
  viewType: ViewType;
}

const statsTypes = [ViewType.THUMBNAILS, ViewType.PROCESSED, ViewType.SAVED];
const fetchUploadsTypes = [ViewType.CHANNELS_WITHOUT_UPLOADS];
const downloadTypes = [ViewType.THUMBNAILS, ViewType.PROCESSED, ViewType.SAVED];
const deleteChannelTypes = [ViewType.CHANNELS_WITHOUT_UPLOADS];

export default function DashboardCard({
  channel,
  viewType,
}: DashboardCardProps) {
  const cardStats = (
    <Card.Stats
      ytId={channel.ytId}
      screenshotsCount={channel.screenshotsCount}
      thumbnails={channel.thumbnails}
      saved={channel.saved}
      defaults={channel.defaults}
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={channel.createdAt} />;

  const cardMenu = <Card.Menu id={channel.id} ytId={channel.ytId} />;

  const syncButton = (
    <SyncUploadsButton
      lastSyncedAt={channel.lastSyncedAt}
      ytChannelId={channel.ytId}
      id={channel.id}
    />
  );

  const downloadButton = <Card.DownloadButton id={channel.id} />;

  const deleteUploadsButton = <Card.DeleteButton ytChannelId={channel.ytId} />;

  const deleteChannelbutton = <DeleteChannel id={channel.id} />;

  const fetchUploadsButton = (
    <FetchUploadsButton
      ytChannelId={channel.ytId}
      videoCount={channel.videoCount}
    />
  );

  return (
    <Card
      key={channel.id}
      id={channel.id}
      ytId={channel.ytId}
      title={channel.title}
      src={channel.src}
      lastSyncedAt={channel.lastSyncedAt}
      ytChannelId={channel.ytId}
      cardStatsSlot={statsTypes.includes(viewType) ? cardStats : cardCreatedAt}
      cardMenuSlot={cardMenu}
      actionButtonSlot={
        fetchUploadsTypes.includes(viewType) ? fetchUploadsButton : syncButton
      }
      downloadButtonSlot={
        downloadTypes.includes(viewType) ? downloadButton : undefined
      }
      deleteButtonSlot={
        deleteChannelTypes.includes(viewType)
          ? deleteChannelbutton
          : deleteUploadsButton
      }
    />
  );
}
