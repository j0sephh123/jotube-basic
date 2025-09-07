import { ListMusic } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconPlaylist() {
  return (
    <IconButton
      icon={<ListMusic />}
      to={`/playlists`}
      tooltip={{
        content: "playlists",
        position: "bottom",
        color: "primary",
      }}
      text="Playlists"
    />
  );
}
