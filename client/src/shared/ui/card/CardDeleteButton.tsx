import { Trash2 } from "lucide-react";
import { useDialog } from "@shared/hooks";

type CardDeleteButtonProps = {
  ytChannelId: string;
  onDelete: (ytChannelId: string) => void;
};

function CardDeleteButton({ ytChannelId, onDelete }: CardDeleteButtonProps) {
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
        onDelete(ytChannelId);
      },
    });
  };

  return (
    <button
      data-testid="card-delete-button"
      onClick={handleDeleteClick}
      className="btn btn-ghost btn-sm btn-circle hover:bg-gray-700/50 transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4 text-red-400" />
    </button>
  );
}

export default CardDeleteButton;
