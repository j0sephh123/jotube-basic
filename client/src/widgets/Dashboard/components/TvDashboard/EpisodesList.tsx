import {
  setEpisodeModal,
  useDeleteEpisode,
  useGetAllEpisodes,
} from "@features/Episode";
import { useDialog } from "@shared/hooks";
import { StaticStates } from "@shared/ui";
import { EpisodeDashboardCard } from "./EpisodeDashboardCard";
import { type GetAllEpisodesInput } from "@shared/api";

export function EpisodesList({ tvIds }: GetAllEpisodesInput) {
  const { data, loading, error } = useGetAllEpisodes({ tvIds });

  const { mutate: deleteEpisodeMutation } = useDeleteEpisode();
  const dialogHook = useDialog();

  const handleEdit = (tvId: number, episodeId: number) => {
    setEpisodeModal({ type: "update", episodeId, tvId });
  };

  const handleDelete = (episodeId: number) => {
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

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data!.getAllEpisodes.map((episode) => (
          <EpisodeDashboardCard
            key={episode.id}
            id={episode.id}
            identifier={episode.identifier}
            title={episode.title}
            artifact={episode.artifact}
            createdAt={episode.createdAt}
            tvId={episode.tvId}
            tvTitle={episode.tvTitle}
            handleEdit={() =>
              handleEdit(Number(episode.tvId), Number(episode.id))
            }
            handleDelete={() => handleDelete(Number(episode.id))}
          />
        ))}
      </div>
    </StaticStates>
  );
}
