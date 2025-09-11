import { useGetPlaylist } from "@features/Playlist";
import { useRefetchPlaylist } from "@features/Playlist";
import { UploadsList, useUploads } from "@features/Upload";
import { IdType } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { useParams } from "react-router-dom";
import { type UploadsType } from "@shared/types";

export function PlaylistUploadsList() {
  const uploadsType = useParams().viewType as UploadsType;
  const playlistId = useTypedParams("playlistId");

  console.log({ uploadsType });

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
    <UploadsList
      handleSideEffect={handleSideEffect}
      data={data}
      uploadsType={uploadsType}
    />
  );
}
