import { Button } from "@shared/ui";
import { useDialog } from "@shared/hooks";
// eslint-disable-next-line import/no-internal-modules, boundaries/element-types
import useDeleteChannel from "@features/Channel/hooks/useDeleteChannel";

export default function DeleteChannel({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess?: () => void;
}) {
  const { mutateAsync } = useDeleteChannel();
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
            onSuccess?.();
          },
        });
      },
    });
  };

  return <Button onClick={handleDeleteClick}>Delete</Button>;
}
