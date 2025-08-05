import Card from "../../../shared/components/card";
import { DashboardResponseData } from "../views/SavedAndProcessedView/useDashboardQuery";
import CardsGridWrapper from "./CardsGridWrapper";

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
      {data.channels?.map((channel) => (
        <Card
          id={channel.id}
          title={channel.title}
          ytId={channel.ytId}
          src={channel.src}
          lastSyncedAt={channel.lastSyncedAt}
          thumbnails={channel.thumbnails}
          saved={channel.saved}
          defaults={channel.defaults}
          uploadsWithScreenshots={channel.uploadsWithScreenshots}
          key={channel.id}
          ytChannelId={channel.ytId}
          screenshotsCount={channel.screenshotsCount}
          screenshots={channel.screenshots}
        />
      ))}
    </CardsGridWrapper>
  );
};

export default SavedOrProcessedCardsList;
