type Props = {
  onCreatePlaylist: () => void;
};

export const CreatePlaylist = ({ onCreatePlaylist }: Props) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Playlists</h1>
      <button onClick={onCreatePlaylist} className="btn btn-primary">
        Create Playlist
      </button>
    </div>
  );
};
