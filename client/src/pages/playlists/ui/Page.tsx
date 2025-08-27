import {
  useGetPlaylists,
  useCreatePlaylist,
  usePlaylist,
} from "@features/Playlist";
import { PlaylistCard } from "@entities/Playlist";
import { CreatePlaylist, CreatePlaylistModal } from "@widgets/CreatePlaylist";
import { StaticStates } from "@shared/ui";

export const PlaylistsPage = () => {
  const { isModalOpen, closePlaylistModal } = usePlaylist();
  const { data, loading, error } = useGetPlaylists();
  console.log(data)
  const createPlaylist = useCreatePlaylist();

  const handleCreatePlaylist = (name: string) => {
    createPlaylist.mutate({
      variables: {
        createPlaylistInput: { name },
      },
      onCompleted: () => {
        closePlaylistModal();
      },
    });
  };

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!data}>
      <CreatePlaylist onCreatePlaylist={() => undefined} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={closePlaylistModal}
        onSubmit={handleCreatePlaylist}
        isLoading={createPlaylist.isPending}
      />
    </StaticStates>
  );
};
