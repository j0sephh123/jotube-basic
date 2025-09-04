import { setTvModal, useGetAllTvs } from "@features/Tv";
import { Button, StaticStates } from "@shared/ui";

export const TvPage = () => {
  const { data, loading, error } = useGetAllTvs();

  const handleEdit = (tvId: number) => {
    setTvModal({ type: "update", tvId });
  };

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <Button
        variant="outline"
        color="primary"
        onClick={() => setTvModal({ type: "create", tvId: null })}
      >
        Create TV
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((tv) => (
          <div key={tv.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{tv.title}</h2>
              <p className="text-sm text-gray-600">{tv.identifier}</p>
              {tv.duration && (
                <p className="text-sm text-gray-500">
                  Duration: {tv.duration} seconds
                </p>
              )}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleEdit(tv.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StaticStates>
  );
};
