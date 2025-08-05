import Card from "../../../shared/components/card";
import { DashboardResponseData } from "../hooks/useDashboardQuery";

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
  if (!data.channels || !Array.isArray(data.channels)) {
    return <div>No channels data available</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {data.channels.map((channel) => (
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
        </div>
      </div>
    </div>
  );
};

export default SavedOrProcessedCardsList;
