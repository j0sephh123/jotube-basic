import { useGetPlaylists, useCreatePlaylist } from "../../hooks";
import { usePlaylist } from "@/store/store";
import { PlaylistCard } from "../../../../entities/Playlist/ui/PlaylistCard";
import { CreatePlaylistModal } from "../CreatePlaylistModal";
import { CreatePlaylist } from "./CreatePlaylist";
import ErrorMessage from "@/shared/ui/static/ErrorMessage";
import Loading from "@/shared/ui/static/Loading";

export const PlaylistsPage = () => {
  const { isModalOpen, closePlaylistModal } = usePlaylist();
  const { data: playlists, loading, error } = useGetPlaylists();
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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message="Error loading playlists" />;
  if (!playlists || playlists.length === 0)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No playlists yet. Create your first one!
        </p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 mt-16">
      <CreatePlaylist />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={closePlaylistModal}
        onSubmit={handleCreatePlaylist}
        isLoading={createPlaylist.isPending}
      />
    </div>
  );
};
