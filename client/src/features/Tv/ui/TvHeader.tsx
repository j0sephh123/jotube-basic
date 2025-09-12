// eslint-disable-next-line import/no-internal-modules
import { setEpisodeModal } from "@features/Episode/model/episodeModalStore";
import { type To } from "@shared/types";
import { CustomLink, CardMenu, Button } from "@shared/ui";
// eslint-disable-next-line boundaries/element-types
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import { useParams } from "react-router-dom";
import { useGetTv } from "../hooks";

export function TvHeader() {
  const { tvId } = useParams<{ tvId: string }>();
  const tvIdNumber = Number(tvId);

  const { data: tvData } = useGetTv({ getTvInput: { id: tvIdNumber } });

  if (!tvData || !tvData.getTv) return null;

  const tv = tvData.getTv;

  const handleCreateEpisode = () => {
    setEpisodeModal({ type: "create", tvId: tvIdNumber });
  };

  return (
    <GenericHeaderContainer
      topLeft={
        <>
          <CustomLink to={`/tv/${tvId}` as To}>
            <h2 className="text-xl font-bold pr-4">{tv.title}</h2>
          </CustomLink>
          <CardMenu id={tvIdNumber} ytId={tv.identifier} />
        </>
      }
      topRight={
        <div className="mb-6">
          <Button
            variant="outline"
            color="primary"
            onClick={handleCreateEpisode}
          >
            Create Episode
          </Button>
        </div>
      }
    />
  );
}
