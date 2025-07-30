import SavedOrProcessedCard from "./SavedOrProcessedCard";
import { DashboardResponseData } from "../../hooks/useDashboardQuery";

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
    <div className="flex items-center justify-center gap-3 text-lg font-bold">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 p-4 mb-10">
        {data.channels.map((channel) => (
          <SavedOrProcessedCard
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
  );
};

export default SavedOrProcessedCardsList;
