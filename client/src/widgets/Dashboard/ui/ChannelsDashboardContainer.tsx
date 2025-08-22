import { useChannelsDashboardQuery } from "@features/Dashboard";
import { Loader } from "lucide-react";
import { ErrorMessage } from "@shared/ui";
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

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !data || !data.channels) {
    return <ErrorMessage message="Error fetching dashboard data" />;
  }

  return <>{children(data.channels, refetch)}</>;
}
