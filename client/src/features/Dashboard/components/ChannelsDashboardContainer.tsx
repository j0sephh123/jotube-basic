import { useChannelsDashboardQuery } from "../useChannelsDashboardQuery";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { DashboardChannel } from "../types";

export default function ChannelsDashboardContainer({
  children,
}: {
  children: (data: DashboardChannel[]) => React.ReactNode;
}) {
  const { data, isLoading, isError } = useChannelsDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorMessage message="Error fetching dashboard data" />;
  }

  return <>{children(data.channels)}</>;
}
