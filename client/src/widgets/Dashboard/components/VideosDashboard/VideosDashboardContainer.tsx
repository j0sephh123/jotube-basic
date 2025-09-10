import { useVideosDashboardQuery } from "@features/Dashboard";
import { StaticStates } from "@shared/ui";
import type { DashboardVideoResponse } from "@shared/api";

export default function VideosDashboardContainer({
  children,
}: {
  children: (data: DashboardVideoResponse[]) => React.ReactNode;
}) {
  const { data, isLoading, error } = useVideosDashboardQuery();

  return (
    <StaticStates
      isLoading={isLoading}
      isError={!!error || !data || !data.videos}
      isEmpty={!data?.videos}
    >
      {children(data?.videos || [])}
    </StaticStates>
  );
}
