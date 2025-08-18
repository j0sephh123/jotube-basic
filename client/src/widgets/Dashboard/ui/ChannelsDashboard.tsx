import { useDashboardParams } from "@widgets/Dashboard/lib/useDashboardParams";
import ChannelDashboardCard from "@/widgets/Dashboard/ui/ChannelDashboardCard";
import ChannelsDashboardContainer from "@/widgets/Dashboard/ui/ChannelsDashboardContainer";

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
