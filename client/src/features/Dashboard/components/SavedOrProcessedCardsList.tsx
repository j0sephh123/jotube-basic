import Card from "../../../shared/components/card";
import { DashboardResponseData } from "../views/SavedAndProcessedView/useDashboardQuery";
import CardsGridWrapper from "./CardsGridWrapper";

type ItemsListProps = {
  data: DashboardResponseData;
  refetchDashboardQuery: () => void;
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const SavedOrProcessedCardsList = ({
  data,
  onDownload,
  onDelete,
}: ItemsListProps) => {
  return (
    <CardsGridWrapper
      isEmpty={!data.channels || !Array.isArray(data.channels)}
      emptyMessage="No channels data available"
    >
      {data.channels?.map((channel) => (
        <Card
          {...channel}
          key={channel.id}
          ytChannelId={channel.ytId}
          onDownload={onDownload}
          onDelete={onDelete}
          screenshotsCount={channel.screenshotsCount}
          screenshots={channel.screenshots}
        />
      ))}
    </CardsGridWrapper>
  );
};

export default SavedOrProcessedCardsList;
