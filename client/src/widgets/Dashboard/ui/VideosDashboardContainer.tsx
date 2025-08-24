import { useVideosDashboardQuery } from "@features/Dashboard";
import { Loader } from "lucide-react";
import { ErrorMessage } from "@shared/ui";
import type { DashboardVideoResponse } from "@shared/api";

export default function VideosDashboardContainer({
  children,
}: {
  children: (data: DashboardVideoResponse[]) => React.ReactNode;
}) {
  const { data, isLoading, error } = useVideosDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !data || !data.videos) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <ErrorMessage message="Error fetching dashboard data" />
      </div>
    );
  }

  return <>{children(data.videos)}</>;
}
