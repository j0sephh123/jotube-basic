import { Header } from "./Header";
import PlaylistDetailsContainer from "./PlaylistDetailsContainer";
import { Playlist } from "../../types";
import Table from "./Table";
import Actions from "./RightSection";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist: Playlist) => (
        <div className="container mx-auto p-6">
          <Header playlist={playlist} />

          <div className="grid grid-cols-2 gap-6 mt-6">
            <Table playlist={playlist} />
            <Actions />
          </div>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
