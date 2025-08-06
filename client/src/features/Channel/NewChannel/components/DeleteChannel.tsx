import useDeleteChannel from "@/features/Channel/hooks/useDeleteChannel";
import { useRefetchNoUploadsView } from "@/features/Dashboard/useDashboardQuery";
import { useDialog } from "@/shared/hooks/useDialog";

export default function DeleteChannel({ id }: { id: number }) {
  const { mutateAsync } = useDeleteChannel();
  const refetchNoUploadsView = useRefetchNoUploadsView();
  const dialogHook = useDialog();

  const handleDeleteClick = () => {
    dialogHook.confirm({
      title: "Delete Channel",
      message:
        "Are you sure you want to delete this channel? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        mutateAsync(id, {
          onSuccess: () => {
            refetchNoUploadsView();
          },
        });
      },
    });
  };

  return (
    <button
      className="btn btn-soft btn-error btn-sm"
      onClick={handleDeleteClick}
    >
      Delete
    </button>
  );
}
