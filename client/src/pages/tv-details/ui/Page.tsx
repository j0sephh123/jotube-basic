import { useParams } from "react-router-dom";
import { useGetTv } from "@features/Tv";
import {
  useGetEpisodesByTvId,
  useDeleteEpisode,
  setEpisodeModal,
  EpisodeModal,
} from "@features/Episode";
import { Button, StaticStates, OpenDirectoryButton } from "@shared/ui";
import { useDialog } from "@shared/hooks";
import { Link } from "react-router-dom";

export const TvDetailsPage = () => {
  const { tvId } = useParams<{ tvId: string }>();
  const tvIdNumber = Number(tvId);

  const {
    data: tvData,
    loading: tvLoading,
    error: tvError,
  } = useGetTv({ getTvInput: { id: tvIdNumber } });

  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetEpisodesByTvId(tvIdNumber);
  const { mutate: deleteEpisodeMutation, isPending: isDeleting } =
    useDeleteEpisode();
  const dialogHook = useDialog();

  const handleEdit = (episodeId: number) => {
    setEpisodeModal({ type: "update", episodeId, tvId: tvIdNumber });
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

  const handleCreateEpisode = () => {
    setEpisodeModal({ type: "create", tvId: tvIdNumber });
  };

  if (tvLoading || episodesLoading) {
    return <div>Loading...</div>;
  }

  if (tvError || episodesError) {
    return <div>Error loading data</div>;
  }

  const tv = tvData?.getTv;
  const episodes = episodesData?.getEpisodesByTvId || [];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{tv?.title}</h1>
        <p className="text-gray-600 mb-4">{tv?.identifier}</p>
        {tv?.duration && (
          <p className="text-sm text-gray-500 mb-4">
            Duration: {tv.duration} seconds
          </p>
        )}
        <OpenDirectoryButton collection={tv?.identifier || ""} />
      </div>

      <div className="mb-6">
        <Button variant="outline" color="primary" onClick={handleCreateEpisode}>
          Create Episode
        </Button>
      </div>

      <StaticStates
        isLoading={false}
        isError={false}
        isEmpty={!episodes.length}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{episode.title}</h2>
                <p className="text-sm text-gray-600">{episode.identifier}</p>
                <p className="text-sm text-gray-500">
                  Artifact: {episode.artifact}
                </p>
                {episode.publishedAt && (
                  <p className="text-sm text-gray-500">
                    Published:{" "}
                    {new Date(episode.publishedAt).toLocaleDateString()}
                  </p>
                )}
                <OpenDirectoryButton
                  collection={tv?.identifier || ""}
                  media={episode.identifier}
                />
                <div className="card-actions justify-end">
                  <Link
                    to={`/tv/${tvIdNumber}/episode/${episode.id}`}
                    className="btn btn-sm btn-outline"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleEdit(Number(episode.id))}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleDelete(Number(episode.id))}
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
      <EpisodeModal />
    </div>
  );
};
