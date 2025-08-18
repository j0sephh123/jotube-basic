import { useDashboardParams } from "@/shared/hooks/useDashboardParams";
import ChannelDashboardCard from "@/features/Dashboard/components/ChannelDashboardCard";
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
