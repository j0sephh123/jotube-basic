import PlaylistTable from "@entities/Playlist/ui/PlaylistTable";
import Header from "@widgets/PlaylistDetails/ui/Header";
import PlaylistDetailsContainer from "@widgets/PlaylistDetails/ui/PlaylistDetailsContainer";
import RightSection from "@widgets/PlaylistDetails/ui/RightSection";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <div className="container mx-auto p-6">
          <Header playlist={playlist} />

          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="col-span-3">
              <PlaylistTable playlist={playlist} />
            </div>
            <div className="col-span-1">
              <RightSection playlist={playlist} />
            </div>
          </div>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
