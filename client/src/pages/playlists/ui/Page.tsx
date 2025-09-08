import { PlaylistListItems } from "@features/Playlist";
import { StaticStates } from "@shared/ui";
import { PlaylistCreateButton } from "@features/Playlist";

export const PlaylistsPage = () => {
  return (
    <StaticStates isLoading={false} isError={false} isEmpty={false}>
      <PlaylistCreateButton />
      <PlaylistListItems />
    </StaticStates>
  );
};
