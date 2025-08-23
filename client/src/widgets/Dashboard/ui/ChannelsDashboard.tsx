import { useDashboardParams } from "@features/Dashboard";
import {
  ChannelDashboardCard,
  ChannelsDashboardContainer,
} from "@widgets/Dashboard";

export default function ChannelsDashboard() {
  const { viewType } = useDashboardParams();

  return (
    <ChannelsDashboardContainer>
      {(channels, refetch) =>
        channels.map((c) => (
          <ChannelDashboardCard
            key={c.id}
            id={c.id}
            ytId={c.ytId}
            title={c.title}
            src={c.src}
            lastSyncedAt={c.lastSyncedAt}
            screenshotsCount={c.screenshotsCount}
            thumbnails={c.thumbnails}
            saved={c.saved}
            defaults={c.defaults}
            storyboard={c.storyboard}
            createdAt={c.createdAt}
            videoCount={c.videoCount}
            playlist={c.playlist}
            viewType={viewType}
            onChannelDelete={refetch}
            openPlaylistModal={() => {}}
          />
        ))
      }
    </ChannelsDashboardContainer>
  );
}
