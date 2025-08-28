import { PlaylistGrid } from "@entities/Playlist";
import {
  PlaylistDetailsHeader,
  PlaylistDetailsContainer,
} from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <>
          <PlaylistDetailsHeader playlist={playlist} />
          <PlaylistGrid playlist={playlist} />
        </>
      )}
    </PlaylistDetailsContainer>
  );
};
