import { useParams } from "react-router-dom";
import { useGetTv } from "@features/Tv";
import {
  useDeleteEpisode,
  setEpisodeModal,
  EpisodeModal,
  useGetAllEpisodes,
} from "@features/Episode";
import { Button, StaticStates, OpenDirectoryButton } from "@shared/ui";
import { useDialog } from "@shared/hooks";
// eslint-disable-next-line import/no-internal-modules
import { EpisodeDashboardCard } from "@widgets/Dashboard/components/TvDashboard/EpisodeDashboardCard";

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
  } = useGetAllEpisodes({ tvIds: [tvIdNumber] });
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
  const episodes = episodesData?.getAllEpisodes || [];

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
            <EpisodeDashboardCard
              key={episode.id}
              id={episode.id}
              identifier={episode.identifier}
              title={episode.title}
              artifact={episode.artifact}
              createdAt={episode.createdAt}
              tvId={episode.tvId}
              tvTitle={episode.tvTitle}
              handleEdit={() => console.log("to edit")}
              handleDelete={() => console.log("to delete")}
            />
          ))}
        </div>
      </StaticStates>
      <EpisodeModal />
    </div>
  );
};
