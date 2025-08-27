import { PlaylistGrid } from "@entities/Playlist";
import { Header, PlaylistDetailsContainer } from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <>
          <Header playlist={playlist} />
          <PlaylistGrid playlist={playlist} />
        </>
      )}
    </PlaylistDetailsContainer>
  );
};
