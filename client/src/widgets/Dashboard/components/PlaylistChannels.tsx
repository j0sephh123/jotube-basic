import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";
import ChannelTableRow from "@widgets/ChannelTableRow";

export const PlaylistChannels = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <div className="max-h-[calc(100vh-200px)] overflow-auto">
          <table className="table table-zebra w-full">
            <thead className="sticky top-0 bg-base-100 z-10 shadow-sm">
              <tr>
                <th className="bg-base-100">Channel</th>
                <th className="bg-base-100">Videos</th>
                <th className="bg-base-100">Screenshots</th>
                <th className="bg-base-100">Stats</th>
                <th className="bg-base-100">Actions</th>
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
                  playlist={{ id: playlist.id, name: playlist.name }}
                  hidePlaylistName={true}
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
