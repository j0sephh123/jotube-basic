import { useGetAllEpisodes } from "@features/Episode";
import { StaticStates } from "@shared/ui";
import { EpisodeDashboardCard } from "./EpisodeDashboardCard";

export function EpisodesList() {
  const { data, loading, error } = useGetAllEpisodes();

  console.log(data);

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.getAllEpisodes?.map((episode) => (
          <EpisodeDashboardCard
            key={episode.id}
            id={episode.id}
            identifier={episode.identifier}
            title={episode.title}
            artifact={episode.artifact}
            createdAt={episode.createdAt}
            tvId={episode.tvId}
            tvTitle={episode.tvTitle}
          />
        ))}
      </div>
    </StaticStates>
  );
}
