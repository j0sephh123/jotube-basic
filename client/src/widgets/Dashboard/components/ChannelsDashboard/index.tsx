import { ChannelsDashboardContainer } from "@widgets/Dashboard";
import { useParams } from "react-router-dom";
import { type ViewType } from "@features/Dashboard";
import ChannelTableRow from "@widgets/ChannelTableRow";

export default function ChannelsDashboard() {
  const { viewType } = useParams<{ viewType: string }>();

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) => (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Stats</th>
                <th>Playlist</th>
                <th>Actions</th>
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
                  showPlaylistColumn={true}
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
