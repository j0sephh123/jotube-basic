/* eslint-disable import/no-internal-modules */
/* eslint-disable boundaries/element-types */
import type { PlaylistDetailsResponse } from "@shared/api";
import { ViewType } from "@features/Dashboard";
import DashboardChannelCard from "@widgets/Dashboard/ui/ChannelDashboardCard";

type TableProps = {
  playlist: PlaylistDetailsResponse;
};

export default function PlaylistGrid({ playlist }: TableProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {playlist.channels.map((channel) => (
        <DashboardChannelCard
          key={channel.id}
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
          videoCount={channel.videoCount}
          openPlaylistModal={() => {}}
          onChannelDelete={() => {}}
          featuredScreenshots={channel.featuredScreenshots}
          createdAt={playlist.createdAt}
          defaults={channel.videoCount}
          saved={channel.savedCount}
          screenshotsCount={channel.screenshotCount}
          storyboard={0}
          thumbnails={channel.thumbnailCount}
          viewType={ViewType.THUMBNAILS}
          lastSyncedAt={channel.lastSyncedAt}
        />
      ))}
    </div>
  );
}
