import { ChannelForPlaylistResponse } from "@/shared/api/generated/graphql";
import { useGetPlaylists, useUpdateChannelPlaylist } from "@features/Playlist/hooks";

interface SelectPlaylistFormProps {
  channel: ChannelForPlaylistResponse;
  selectedPlaylistId: number | null;
  setSelectedPlaylistId: (id: number | null) => void;
  onSuccess: () => void;
}

export const SelectPlaylistForm = ({
  channel,
  selectedPlaylistId,
  setSelectedPlaylistId,
  onSuccess,
}: SelectPlaylistFormProps) => {
  const { data: playlists, loading: playlistsLoading } = useGetPlaylists();
  const updateChannelPlaylist = useUpdateChannelPlaylist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channel) {
      updateChannelPlaylist.mutate({
        variables: {
          updateChannelPlaylistInput: {
            channelId: channel.id,
            playlistId: selectedPlaylistId, // This can be null to remove playlist
          },
        },
        onCompleted: () => {
          onSuccess();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Select Playlist</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedPlaylistId || ""}
          onChange={(e) =>
            setSelectedPlaylistId(
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          disabled={playlistsLoading || updateChannelPlaylist.isPending}
        >
          <option value="">No Playlist</option>
          {playlists && playlists.length > 0 ? (
            playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name} ({playlist.channels?.length || 0} channels)
              </option>
            ))
          ) : (
            <option disabled>No playlists available</option>
          )}
        </select>
      </div>

      <div className="modal-action">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={playlistsLoading || updateChannelPlaylist.isPending}
        >
          {updateChannelPlaylist.isPending ? "Updating..." : "Update Playlist"}
        </button>
      </div>
    </form>
  );
};
