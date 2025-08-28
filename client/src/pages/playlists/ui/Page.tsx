import { useGetPlaylists } from "@features/Playlist";
import { PlaylistCard } from "@entities/Playlist";
import { StaticStates } from "@shared/ui";

export const PlaylistsPage = () => {
  const { data, loading, error } = useGetPlaylists();

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </StaticStates>
  );
};
