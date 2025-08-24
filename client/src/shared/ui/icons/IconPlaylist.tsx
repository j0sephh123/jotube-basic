import { ListMusic } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconPlaylist() {
  return (
    <IconButton
      icon={<ListMusic />}
      to={routes.playlists()}
      tooltip={{
        content: "playlists",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
