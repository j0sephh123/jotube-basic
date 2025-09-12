import { useDialog } from "@shared/hooks";
// eslint-disable-next-line import/no-internal-modules
import { useDeleteEpisode } from "@features/Episode/hooks/useDeleteEpisode";

export function useDeleteEpisodeConfirm() {
  const dialogHook = useDialog();
  const { mutate: deleteEpisodeMutation } = useDeleteEpisode();

  return (episodeId: number) => {
    dialogHook.confirm({
      title: "Delete Episode",
      message:
        "Are you sure you want to delete this episode? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: () => {
        deleteEpisodeMutation({
          variables: { deleteEpisodeInput: { id: Number(episodeId) } },
        });
      },
    });
  };
}
