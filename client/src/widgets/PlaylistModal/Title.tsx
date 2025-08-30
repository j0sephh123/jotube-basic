import { usePlaylistModalState } from "@features/Playlist";
import { IconPlaylist } from "@shared/ui";

export function Title() {
  const { type } = usePlaylistModalState();

  return (
    <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
      <IconPlaylist />
      <span>{type === "create" ? "Create Playlist" : "Update Playlist"}</span>
    </h2>
  );
}
