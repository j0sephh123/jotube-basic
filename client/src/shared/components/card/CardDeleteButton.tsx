import { Trash2 } from "lucide-react";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useDialog } from "@/shared/hooks/useDialog";

type CardDeleteButtonProps = {
  ytChannelId: string;
};

function CardDeleteButton({ ytChannelId }: CardDeleteButtonProps) {
  const deleteUploadsMutation = useDeleteUploads(() => {});
  const dialogHook = useDialog();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dialogHook.confirm({
      title: "Delete uploads",
      message:
        "Are you sure you want to delete all saved uploads for this channel? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        deleteUploadsMutation({
          ytChannelId,
          ytVideoIds: [],
        });
      },
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
