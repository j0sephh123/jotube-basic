import { useParams } from "react-router-dom";
import { useGetEpisodeDetails } from "@features/Episode";

export const EpisodeDetailsPage = () => {
  const { episodeId } = useParams<{ episodeId: string }>();
  const episodeIdNumber = Number(episodeId);

  const {
    data: episodeData,
    loading,
    error,
  } = useGetEpisodeDetails({
    getEpisodeInput: { id: episodeIdNumber },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading episode: {error.message}</div>;
  }

  const episode = episodeData?.getEpisodeDetails;

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
        <p className="text-gray-600 mb-4">{episode.identifier}</p>
      </div>

      <div className="bg-base-200 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Episode Details (JSON)</h2>
        <pre className="bg-base-300 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(episode, null, 2)}
        </pre>
      </div>
    </div>
  );
};
