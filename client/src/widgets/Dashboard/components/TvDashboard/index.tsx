import { useParams } from "react-router-dom";
import { TvList } from "./TvList";
import { EpisodesList } from "./EpisodesList";

const mapViewTypeToArtifact = {
  thumbnails: "THUMBNAIL",
  saved: "SAVED",
  screenshots: "SCREENSHOT",
} as const;

export const TvDashboard = () => {
  const params = useParams();

  const isTvs = params.viewType === "tvs";
  const isSavedEpisodes = params.viewType === "saved";
  const isThumbnails = params.viewType === "thumbnails";
  const isScreenshots = params.viewType === "screenshots";

  const shouldShowEpisodesList =
    isSavedEpisodes || isThumbnails || isScreenshots;

  return (
    <>
      {isTvs && <TvList />}
      {shouldShowEpisodesList && (
        <EpisodesList
          tvIds={[]}
          artifact={
            mapViewTypeToArtifact[
              params.viewType as keyof typeof mapViewTypeToArtifact
            ]
          }
        />
      )}
    </>
  );
};
