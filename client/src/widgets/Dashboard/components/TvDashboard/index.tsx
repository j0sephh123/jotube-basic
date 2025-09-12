import { useParams } from "react-router-dom";
import { TvList } from "./TvList";
import { EpisodesList } from "./EpisodesList";

export const TvDashboard = () => {
  const params = useParams();

  console.log(params);

  const isTvs = params.viewType === "tvs";
  const isSavedEpisodes = params.viewType === "saved";

  return (
    <>
      {isTvs && <TvList />}
      {isSavedEpisodes && <EpisodesList tvIds={[]} />}
    </>
  );
};
