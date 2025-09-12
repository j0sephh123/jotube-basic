import { useGetAllTvs, setTvModal } from "@features/Tv";
import { StaticStates } from "@shared/ui";
import { TvDashboardCard } from "./TvDashboardCard";
import { useDeleteTvConfirm } from "./useDeleteTvConfirm";

export function TvList() {
  const { data, loading, error } = useGetAllTvs();

  const handleEdit = (tvId: number) => {
    setTvModal({ type: "update", tvId });
  };

  const handleDelete = useDeleteTvConfirm();

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((tv) => (
          <TvDashboardCard
            key={tv.id}
            title={tv.title}
            identifier={tv.identifier}
            id={Number(tv.id)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            createdAt={tv.createdAt}
            amountOfEpisodes={tv.amountOfEpisodes}
          />
        ))}
      </div>
    </StaticStates>
  );
}
