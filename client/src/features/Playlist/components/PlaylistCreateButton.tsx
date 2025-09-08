import { Button } from "@shared/ui";
import { setPlaylistModal } from "../model";

export function PlaylistCreateButton() {
  return (
    <Button
      variant="outline"
      color="primary"
      onClick={() => setPlaylistModal({ type: "create" })}
      className="mb-4"
    >
      Create playlist
    </Button>
  );
}
