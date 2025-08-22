import { useVideosDashboardQuery } from "@/features/Dashboard/api/useVideosDashboardQuery";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/ui/static/ErrorMessage";
import type { DashboardVideoResponse } from "@/shared/api/generated/graphql";

export default function VideosDashboardContainer({
  children,
}: {
  children: (data: DashboardVideoResponse[]) => React.ReactNode;
}) {
  const { data, isLoading, error } = useVideosDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !data || !data.videos) {
    return <ErrorMessage message="Error fetching dashboard data" />;
  }

  return <>{children(data.videos)}</>;
}
