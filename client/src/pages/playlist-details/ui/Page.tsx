import { PlaylistGrid } from "@entities/Playlist";
import { Header, PlaylistDetailsContainer } from "@widgets/PlaylistDetails";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <div className="container mx-auto p-6 mt-12">
          <Header playlist={playlist} />
          <PlaylistGrid playlist={playlist} />
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
