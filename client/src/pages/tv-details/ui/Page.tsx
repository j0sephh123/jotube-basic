import { useParams } from "react-router-dom";
import { EpisodeModal } from "@features/Episode";
// eslint-disable-next-line import/no-internal-modules
import { EpisodesList } from "@widgets/Dashboard/components/TvDashboard/EpisodesList";
import { TvHeader } from "@features/Tv";

export const TvDetailsPage = () => {
  const { tvId } = useParams<{ tvId: string }>();
  const tvIdNumber = Number(tvId);

  return (
    <div className="container mx-auto p-6">
      <TvHeader />
      {tvId && <EpisodesList tvIds={[tvIdNumber]} />}
      <EpisodeModal />
    </div>
  );
};
