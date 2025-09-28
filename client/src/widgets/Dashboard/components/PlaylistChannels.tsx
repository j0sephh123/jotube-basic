import { PlaylistGrid } from "@entities/Playlist";
import { PlaylistDetailsContainer } from "@widgets/PlaylistDetails";

export const PlaylistChannels = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist, refetch) => (
        <PlaylistGrid playlist={playlist} refetch={refetch} />
      )}
    </PlaylistDetailsContainer>
  );
};
