import { Download } from "lucide-react";

type CardDownloadButtonProps = {
  id: number;
  ytChannelId: string;
  onDownload: (ytChannelId: string) => void;
};

export default function CardDownloadButton({
  id,
  ytChannelId,
  onDownload,
}: CardDownloadButtonProps) {
  const handleDownload = () => {
    onDownload(ytChannelId);
  };

  return (
    <button
      data-testid="card-download-button"
      onClick={() => handleDownload(id)}
      className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
      title="Download"
    >
      <Download className="w-4 h-4 text-blue-400" />
    </button>
  );
}
