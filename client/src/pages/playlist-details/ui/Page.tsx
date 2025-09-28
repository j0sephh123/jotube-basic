import { PlaylistGrid } from "@entities/Playlist";
import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <PlaylistGrid playlist={playlist} refetch={refetch} />
      )}
    </PlaylistDetailsContainer>
  );
};
