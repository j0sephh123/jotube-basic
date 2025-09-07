import { useGetPlaylist } from "@features/Playlist";
import { useRefetchPlaylist } from "@features/Playlist";
import { UploadsList, useUploads } from "@features/Upload";
import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { PlaylistHeader } from "@features/Playlist";
import { useTypedParams } from "@shared/hooks";

export function PlaylistUploadsListPage() {
  const uploadsType = useTypedParams("uploadsType");
  const playlistId = useTypedParams("playlistId");

  const { data, refetch } = useUploads({
    id: { type: IdType.Playlist, value: Number(playlistId) },
    uploadsType,
  });

  const { data: playlist } = useGetPlaylist(null);

  const refetchPlaylist = useRefetchPlaylist();

  const handleSideEffect = () => {
    refetchPlaylist();
    refetch();
  };

  if (!data || !playlist) return null;

  return (
    <div className="container mx-auto px-4 py-2">
      <PlaylistHeader
        playlist={playlist?.playlistDetails as PlaylistDetailsResponse}
      />
      <UploadsList
        handleSideEffect={handleSideEffect}
        data={data}
        uploadsType={uploadsType}
      />
    </div>
  );
}
