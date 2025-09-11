import { PlaylistGrid } from "@entities/Playlist";
import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => <PlaylistGrid playlist={playlist} />}
    </PlaylistDetailsContainer>
  );
};
