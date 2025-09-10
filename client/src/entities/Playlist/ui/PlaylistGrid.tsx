/* eslint-disable import/no-internal-modules */
/* eslint-disable boundaries/element-types */
import type { PlaylistDetailsResponse } from "@shared/api";
import { ViewType } from "@features/Dashboard";
import DashboardChannelCard from "@widgets/Dashboard/components/ChannelDashboardCard";
import { Grid } from "@widgets/Grid";

type TableProps = {
  playlist: PlaylistDetailsResponse;
};

export default function PlaylistGrid({ playlist }: TableProps) {
  return (
    <Grid>
      {playlist.channels.map((channel) => (
        <DashboardChannelCard
          key={channel.id}
          id={channel.id}
          ytId={channel.ytId}
          title={channel.title}
          src={channel.src}
          videoCount={channel.videoCount}
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
          isPlaylistPage
        />
      ))}
    </Grid>
  );
}
