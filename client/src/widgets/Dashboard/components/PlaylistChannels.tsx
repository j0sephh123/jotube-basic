import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import ChannelTableRow from "@widgets/ChannelTableRow";

export const PlaylistChannels = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlist?.channels.map((channel) => (
                <ChannelTableRow
                  key={channel.id}
                  id={channel.id}
                  ytId={channel.ytId}
                  title={channel.title}
                  src={channel.src}
                  lastSyncedAt={channel.lastSyncedAt}
                  screenshotsCount={channel.screenshotCount}
                  thumbnails={channel.thumbnailCount}
                  saved={channel.saved}
                  defaults={channel.videoCount}
                  storyboard={channel.storyboardCount}
                  createdAt=""
                  videoCount={channel.videoCount}
                  featuredScreenshots={channel.featuredScreenshots}
                  onSyncUploads={refetch}
                  showPlaylistColumn={false}
                  viewType="thumbnails"
                />
              )) || []}
            </tbody>
          </table>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
