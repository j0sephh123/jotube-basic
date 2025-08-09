import { Loader } from "lucide-react";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import CardsGridWrapper from "./components/CardsGridWrapper";
import { useDashboardParams } from "@/shared/hooks/useDashboardParams";
import { useDashboardQuery } from "./useDashboardQuery";
import DashboardCard from "./components/DashboardCard";
import Videos from "./components/Videos";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardQuery();
  const { viewType, type } = useDashboardParams();

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

  if (type === "videos") {
    return <Videos />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1">
        <CardsGridWrapper>
          {data.channels?.map((channel) => (
            <DashboardCard
              key={channel.id}
              channel={channel}
              viewType={viewType}
            />
          ))}
        </CardsGridWrapper>
      </div>
    </div>
  );
}
