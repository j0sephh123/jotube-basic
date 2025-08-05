import { Loader } from "lucide-react";
import ItemList from "../components/SavedOrProcessedCardsList";
import ErrorMessage from "@/shared/components/static/ErrorMessage";
import { useDashboardQuery } from "@/features/Dashboard/hooks/useDashboardQuery";
import useAddUploadsToQueue from "@/features/Upload/hooks/useAddUploadsToQueue";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";

export default function DashboardMain() {
  const downloadMutation = useAddUploadsToQueue();
  const deleteUploadsMutation = useDeleteUploads();

  const {
    data,
    isLoading,
    refetch: refetchDashboardQuery,
    isError,
  } = useDashboardQuery();

  const handleDownload = (id: number) => {
    const channel = data?.channels.find((ch) => ch.id === id);
    if (!channel?.ytId) return;

    downloadMutation.mutate([
      {
        downloadOption: 0,
        ytChannelId: channel.ytId,
      },
    ]);
  };

  const handleDelete = (id: number) => {
    const channel = data?.channels.find((ch) => ch.id === id);
    if (!channel?.ytId) return;

    deleteUploadsMutation({
      ytChannelId: channel.ytId,
      ytVideoIds: [],
    });
  };

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
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
