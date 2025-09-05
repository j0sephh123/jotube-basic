import { useParams, Link } from "react-router-dom";
import { useGetEpisodeDetails } from "@features/Episode";
import { OpenDirectoryButton, StaticStates } from "@shared/ui";
import { FileUploadDropzone } from "@features/FileUpload";
import { EpisodeList } from "@features/FileUpload/components/EpisodeList";

export const EpisodeDetailsPage = () => {
  const { episodeId, tvId } = useParams<{ episodeId: string; tvId: string }>();
  const episodeIdNumber = Number(episodeId);

  const {
    data: episodeData,
    loading,
    error,
  } = useGetEpisodeDetails({
    getEpisodeInput: { id: episodeIdNumber },
  });

  const episode = episodeData?.getEpisodeDetails;

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!episode}>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link to={`/tv/${tvId}`} className="btn btn-outline btn-sm mb-4">
            ← Back to {episode?.tv?.title || "TV"}
          </Link>
          <h1 className="text-3xl font-bold mb-2">{episode?.title}</h1>
          <p className="text-gray-600 mb-4">{episode?.identifier}</p>
          <div className="mb-6">
            <div className="space-y-4">
              <FileUploadDropzone
                accept="image/*,video/*,.pdf"
                episodeId={episodeId as string}
              />
            </div>
            <OpenDirectoryButton
              collection={episode?.tv?.identifier || ""}
              media={episode?.identifier}
            />
          </div>
        </div>
        <EpisodeList />

        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Episode Details (JSON)</h2>
          <pre className="bg-base-300 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(episode, null, 2)}
          </pre>
        </div>
      </div>
    </StaticStates>
  );
};
