import { useState } from "react";
import { useGetPlaylists, useCreatePlaylist } from "../hooks";
import { PlaylistCard } from "./PlaylistCard";
import { CreatePlaylistModal } from "./CreatePlaylistModal";

export const PlaylistsPage = () => {
  // TODO: Add page for all playlists, page for single playlist, and way to create new playlist
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: playlists, isLoading, error } = useGetPlaylists();
  const createPlaylist = useCreatePlaylist();

  const handleCreatePlaylist = (name: string) => {
    createPlaylist.mutate(
      { name },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
        },
      }
    );
  };

  if (isLoading)
    return <div className="flex justify-center p-8">Loading playlists...</div>;
  if (error)
    return (
      <div className="flex justify-center p-8 text-error">
        Error loading playlists
      </div>
    );

  return (
    <div className="container mx-auto p-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary"
        >
          Create Playlist
        </button>
      </div>

      {playlists && playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No playlists yet. Create your first one!
          </p>
        </div>
      )}

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
        isLoading={createPlaylist.isPending}
      />
    </div>
  );
};
