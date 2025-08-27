import { useChannelsDashboardQuery } from "@features/Dashboard";
import { StaticStates } from "@shared/ui";
import type { DashboardChannelResponse } from "@shared/api";

export default function ChannelsDashboardContainer({
  children,
}: {
  children: (
    data: DashboardChannelResponse[],
    refetch: () => void
  ) => React.ReactNode;
}) {
  const { data, isLoading, error, refetch } = useChannelsDashboardQuery();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error}
      isEmpty={!data?.channels}
    >
      {children(data?.channels as DashboardChannelResponse[], refetch)}
    </StaticStates>
  );
}
