import { useParams } from "react-router-dom";
import { TvList } from "./TvList";
import { EpisodesList } from "./EpisodesList";

export const TvDashboard = () => {
  const params = useParams();

  console.log(params);

  const isTvs = params.viewType === "tvs";
  const isEpisodes = params.viewType === "episodes";

  return (
    <>
      {isTvs && <TvList />}
      {isEpisodes && <EpisodesList />}
    </>
  );
};
