import { setTvModal, useGetAllTvs, useDeleteTv } from "@features/Tv";
import { OpenDirectoryButton, StaticStates } from "@shared/ui";
import { useDialog } from "@shared/hooks";
import { Link } from "react-router-dom";

export const TvPage = () => {
  const { data, loading, error } = useGetAllTvs();
  const { mutate: deleteTvMutation, isPending: isDeleting } = useDeleteTv();
  const dialogHook = useDialog();

  const handleEdit = (tvId: number) => {
    setTvModal({ type: "update", tvId });
  };

  const handleDelete = (tvId: number) => {
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

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
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
              <OpenDirectoryButton collection={tv.identifier} />
              <div className="card-actions justify-end">
                <Link to={`/tv/${tv.id}`} className="btn btn-sm btn-outline">
                  View Episodes
                </Link>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleEdit(Number(tv.id))}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleDelete(Number(tv.id))}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StaticStates>
  );
};
