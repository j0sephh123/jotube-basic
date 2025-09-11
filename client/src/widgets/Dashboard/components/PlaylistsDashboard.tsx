/* eslint-disable boundaries/element-types */
import { PlaylistDetailsPage } from "@pages/playlist-details";
import { PlaylistUploadsList } from "@pages/playlistUploadsList";
import { useParams } from "react-router-dom";

export function PlaylistsDashboard() {
  const { viewType } = useParams();

  return (
    <>
      {viewType === "channels" ? (
        <PlaylistDetailsPage />
      ) : (
        <PlaylistUploadsList />
      )}
    </>
  );
}
