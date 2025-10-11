import { ChannelsDashboardContainer } from "@widgets/Dashboard";
import { useParams } from "react-router-dom";
import { type ViewType } from "@features/Dashboard";
import ChannelTableRow from "@widgets/ChannelTableRow";

export default function ChannelsDashboard() {
  const { viewType } = useParams<{ viewType: string }>();

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) => (
        <div className="max-h-[calc(100vh-200px)] overflow-auto">
          <table className="table table-zebra w-full">
            <thead className="sticky top-0 bg-base-100 z-10 shadow-sm">
              <tr>
                <th className="bg-base-100">Channel</th>
                <th className="bg-base-100">Default</th>
                <th className="bg-base-100">Saved</th>
                <th className="bg-base-100">Screenshots</th>
                <th className="bg-base-100">Storyboards</th>
                <th className="bg-base-100">Thumbnails</th>
                <th className="bg-base-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {channels?.map((channel) => (
                <ChannelTableRow
                  key={channel.id}
                  id={channel.id}
                  ytId={channel.ytId}
                  title={channel.title}
                  src={channel.src}
                  lastSyncedAt={channel.lastSyncedAt}
                  screenshotsCount={channel.screenshotsCount}
                  thumbnails={channel.thumbnails}
                  saved={channel.saved}
                  defaults={channel.defaults}
                  storyboard={channel.storyboard}
                  createdAt={channel.createdAt}
                  videoCount={channel.videoCount}
                  playlist={channel.playlist}
                  featuredScreenshots={channel.featuredScreenshots}
                  onChannelDelete={refetch}
                  onSyncUploads={refetch}
                  showPlaylistColumn={false}
                  viewType={viewType as unknown as ViewType}
                />
              )) || []}
            </tbody>
          </table>
        </div>
      )}
    </ChannelsDashboardContainer>
  );
}
