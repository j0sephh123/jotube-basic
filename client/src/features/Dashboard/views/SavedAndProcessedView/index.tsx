import { Loader } from "lucide-react";
import ItemList from "../../components/SavedOrProcessedCardsList";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { useDashboardQuery } from "@/features/Dashboard/views/SavedAndProcessedView/useDashboardQuery";

export default function SavedAndProcessedView() {
  const {
    data,
    isLoading,
    refetch: refetchDashboardQuery,
    isError,
  } = useDashboardQuery();

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

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1">
        <ItemList
          data={data}
          refetchDashboardQuery={refetchDashboardQuery}
        />
      </div>
    </div>
  );
}
