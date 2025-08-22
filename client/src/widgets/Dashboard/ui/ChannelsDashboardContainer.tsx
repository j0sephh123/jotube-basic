import { useChannelsDashboardQuery } from "@/features/Dashboard/api/useChannelsDashboardQuery";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/ui/static/ErrorMessage";
import { DashboardChannelResponse } from "@/shared/api/generated/graphql";

export default function ChannelsDashboardContainer({
  children,
}: {
  children: (data: DashboardChannelResponse[]) => React.ReactNode;
}) {
  const { data, isLoading, error } = useChannelsDashboardQuery();

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

  return <>{children(data.channels)}</>;
}
