import CardStats from "@/shared/components/card/CardStats";
import Card from "../../../shared/components/card";
import { DashboardResponseData } from "../views/SavedAndProcessedView/useDashboardQuery";
import CardsGridWrapper from "./CardsGridWrapper";
import CardMenu from "@/shared/components/card/CardMenu";

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
          <CardStats
            ytId={channel.ytId}
            screenshotsCount={channel.screenshotsCount}
            thumbnails={channel.thumbnails || 0}
            saved={channel.saved}
            defaults={channel.defaults}
          />
        );

        const cardMenu = (
          <CardMenu id={channel.id} ytId={channel.ytId} />
        );

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
          />
        );
      })}
    </CardsGridWrapper>
  );
};

export default SavedOrProcessedCardsList;
