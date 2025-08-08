import { useDashboardQuery } from "@/features/Dashboard/useDashboardQuery";
import useDownload from "@/features/Upload/hooks/useDownload";
import { Download } from "lucide-react";

type CardDownloadButtonProps = {
  id: number;
};

export default function CardDownloadButton({ id }: CardDownloadButtonProps) {
  const { data } = useDashboardQuery();

  const downloadMutation = useDownload();
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

  return (
    <button
      onClick={() => handleDownload(id)}
      className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
      title="Download"
    >
      <Download className="w-4 h-4 text-blue-400" />
    </button>
  );
}
