import { useVideosDashboardQuery } from "../useVideosDashboardQuery";
import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { DashboardVideo } from "../types";

export default function VideosDashboardContainer({
  children,
}: {
  children: (data: DashboardVideo[]) => React.ReactNode;
}) {
  const { data, isLoading, isError } = useVideosDashboardQuery();

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

  return <>{children(data)}</>;
}
