import { useDialog } from "@shared/hooks";
import { useDeleteTv } from "@features/Tv";

export function useDeleteTvConfirm() {
  const { mutate: deleteTvMutation } = useDeleteTv();
  const dialogHook = useDialog();

  return (tvId: number) => {
    dialogHook.confirm({
      title: "Delete TV",
      message:
        "Are you sure you want to delete this tv? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        deleteTvMutation({
          variables: { deleteTvInput: { id: Number(tvId) } },
        });
      },
    });
  };
}
