import { setTvModal, useGetAllTvs } from "@features/Tv";
import { StaticStates } from "@shared/ui";
import { useDeleteTvConfirm } from "./useDeleteTvConfirm";
import { TvDashboardCard } from "./TvDashboardCard";

export const TvDashboard = () => {
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
          />
        ))}
      </div>
    </StaticStates>
  );
};
