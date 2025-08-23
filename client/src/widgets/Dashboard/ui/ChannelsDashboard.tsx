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
            {...c}
            key={c.id}
            viewType={viewType}
            onChannelDelete={refetch}
            openPlaylistModal={() => {}}
          />
        ))
      }
    </ChannelsDashboardContainer>
  );
}
