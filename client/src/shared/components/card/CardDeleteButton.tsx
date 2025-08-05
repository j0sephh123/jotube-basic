import { Trash2 } from "lucide-react";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";

type CardDeleteButtonProps = {
  ytChannelId: string;
};

function CardDeleteButton({
  ytChannelId,
}: CardDeleteButtonProps) {
  const deleteUploadsMutation = useDeleteUploads();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteUploadsMutation({
      ytChannelId,
      ytVideoIds: [],
    });
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4 text-red-400" />
    </button>
  );
}

export default CardDeleteButton;
