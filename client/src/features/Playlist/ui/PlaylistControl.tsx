import { setPlaylistModal } from "../model";
import { DoubleAction } from "@shared/ui";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  playlistId?: number;
  playlistName?: string;
  size?: "sm" | "md";
};

export function PlaylistControl({
  id,
  playlistId,
  playlistName,
  size = "md",
}: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (playlistId) {
      navigate(`/dashboard/playlists/channels/${playlistId}`);
    }
  };

  const handleEdit = () => {
    setPlaylistModal({
      type: "modifyPlaylistForChannel",
      channelId: id,
      playlistId: playlistId ?? 0,
    });
  };

  return (
    <DoubleAction
      label="playlist"
      count={0}
      onNavigate={handleNavigate}
      onFirst={handleEdit}
      playlistName={playlistName}
      playlistId={playlistId}
      size={size}
    />
  );
}
