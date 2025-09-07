import { PlaylistGrid } from "@entities/Playlist";
import { PlaylistHeader } from "@features/Playlist";
import {
  PlaylistDetailsContainer,
} from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <>
          <PlaylistHeader playlist={playlist} />
          <PlaylistGrid playlist={playlist} />
        </>
      )}
    </PlaylistDetailsContainer>
  );
};
