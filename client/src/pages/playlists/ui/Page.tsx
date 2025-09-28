import { PlaylistListItems } from "@features/Playlist";
import { StaticStates } from "@shared/ui";

export const PlaylistsPage = () => {
  return (
    <StaticStates isLoading={false} isError={false} isEmpty={false}>
      <PlaylistListItems />
    </StaticStates>
  );
};
