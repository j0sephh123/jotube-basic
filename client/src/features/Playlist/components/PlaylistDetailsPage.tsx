import { useParams, Link } from "react-router-dom";
import { useGetPlaylist } from "../hooks";

export const PlaylistDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist, isLoading, error } = useGetPlaylist(Number(id));

  if (isLoading)
    return <div className="flex justify-center p-8">Loading playlist...</div>;
  if (error)
    return (
      <div className="flex justify-center p-8 text-error">
        Error loading playlist
      </div>
    );
  if (!playlist)
    return <div className="flex justify-center p-8">Playlist not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link to="/playlists" className="btn btn-ghost btn-sm mb-4">
          ← Back to Playlists
        </Link>
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
        <p className="text-gray-500">
          Created {new Date(playlist.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="stats shadow mb-6">
        <div className="stat">
          <div className="stat-title">Total Channels</div>
          <div className="stat-value">{playlist.channels.length}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Channels</h2>
          {playlist.channels.length > 0 ? (
            <div className="space-y-4">
              {playlist.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{channel.title}</h3>
                    <p className="text-sm text-gray-500">ID: {channel.ytId}</p>
                    <p className="text-sm text-gray-500">
                      {channel.videoCount} videos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Added {new Date(channel.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No channels in this playlist yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
