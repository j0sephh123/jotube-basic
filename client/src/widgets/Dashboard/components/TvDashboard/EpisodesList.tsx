import { setEpisodeModal, useGetAllEpisodes } from "@features/Episode";
import { StaticStates } from "@shared/ui";
import { EpisodeDashboardCard } from "./EpisodeDashboardCard";
import { type GetAllEpisodesInput } from "@shared/api";
import { useDeleteEpisodeConfirm } from "./useDeleteEpisodeConfirm";
import { Virtualizer } from "@widgets/Virtualizer";

export function EpisodesList(input: GetAllEpisodesInput) {
  const { data, loading, error } = useGetAllEpisodes(input);

  const handleEdit = (tvId: number, episodeId: number) => {
    setEpisodeModal({ type: "update", episodeId, tvId });
  };

  const handleDelete = useDeleteEpisodeConfirm();

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <Virtualizer
        items={data?.getAllEpisodes ?? []}
        ItemComponent={({ item }) => (
          <EpisodeDashboardCard
            key={item.id}
            id={item.id}
            identifier={item.identifier}
            title={item.title}
            artifact={item.artifact}
            createdAt={item.createdAt}
            tvId={item.tvId}
            tvTitle={item.tvTitle}
            handleEdit={() => handleEdit(Number(item.tvId), Number(item.id))}
            handleDelete={() => handleDelete(Number(item.id))}
            tvIdentifier={item.tvIdentifier}
          />
        )}
        flexibleHeight={true}
      />
    </StaticStates>
  );
}
