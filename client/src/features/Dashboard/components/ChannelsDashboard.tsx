import { useDashboardParams } from "@/shared/hooks/useDashboardParams";
import ChannelDashboardCard from "./ChannelDashboardCard";
import ChannelsDashboardContainer from "./ChannelsDashboardContainer";

export default function ChannelsDashboard() {
  const { viewType } = useDashboardParams();

  return (
    <ChannelsDashboardContainer>
      {(channels) =>
        channels.map((c) => (
          <ChannelDashboardCard {...c} key={c.id} viewType={viewType} />
        ))
      }
    </ChannelsDashboardContainer>
  );
}
