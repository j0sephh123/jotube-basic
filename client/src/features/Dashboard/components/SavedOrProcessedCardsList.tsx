import Card from "../../../shared/components/card";
import { DashboardResponseData } from "../views/SavedAndProcessedView/useDashboardQuery";
import CardsGridWrapper from "./CardsGridWrapper";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";

type ItemsListProps = {
  data: DashboardResponseData;
  refetchDashboardQuery: () => void;
};

const SavedOrProcessedCardsList = ({ data }: ItemsListProps) => {
  return (
    <CardsGridWrapper
      isEmpty={!data.channels || !Array.isArray(data.channels)}
      emptyMessage="No channels data available"
    >
      {data.channels?.map((channel) => {
        const cardStats = (
          <Card.Stats
            ytId={channel.ytId}
            screenshotsCount={channel.screenshotsCount}
            thumbnails={channel.thumbnails || 0}
            saved={channel.saved}
            defaults={channel.defaults}
          />
        );

        const cardMenu = <Card.Menu id={channel.id} ytId={channel.ytId} />;

        const syncButton = (
          <SyncUploadsButton
            lastSyncedAt={channel.lastSyncedAt || null}
            ytChannelId={channel.ytId}
            id={channel.id}
          />
        );

        const downloadButton = <Card.DownloadButton id={channel.id} />;
        const deleteButton = channel.ytId ? (
          <Card.DeleteButton ytChannelId={channel.ytId} />
        ) : null;

        return (
          <Card
            id={channel.id}
            title={channel.title}
            ytId={channel.ytId}
            src={channel.src}
            lastSyncedAt={channel.lastSyncedAt}
            key={channel.id}
            ytChannelId={channel.ytId}
            cardStatsSlot={cardStats}
            cardMenuSlot={cardMenu}
            actionButtonSlot={syncButton}
            downloadButtonSlot={downloadButton}
            deleteButtonSlot={deleteButton}
          />
        );
      })}
    </CardsGridWrapper>
  );
};

export default SavedOrProcessedCardsList;
