/* eslint-disable boundaries/element-types */
import { PlaylistUploadsList } from "@pages/playlistUploadsList";
import { PlaylistChannels } from "./PlaylistChannels";
import { useParams } from "react-router-dom";

export function PlaylistsDashboard() {
  const { viewType } = useParams();

  return (
    <>
      {viewType === "channels" ? (
        <PlaylistChannels />
      ) : (
        <PlaylistUploadsList />
      )}
    </>
  );
}
