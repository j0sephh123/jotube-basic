import { StaticStates } from "@shared/ui";
import { useGetPlaylists } from "../hooks";
import { PlaylistListItem } from "./PlaylistListItem";

export function PlaylistListItems() {
  const { data, loading, error } = useGetPlaylists();

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <div className="space-y-3">
        {data?.map((playlist) => (
          <PlaylistListItem key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </StaticStates>
  );
}
