import { usePlaylist } from "@/store/store";

export const CreatePlaylist = () => {
  const { openPlaylistModal } = usePlaylist();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Playlists</h1>
      <button onClick={() => openPlaylistModal("")} className="btn btn-primary">
        Create Playlist
      </button>
    </div>
  );
};
