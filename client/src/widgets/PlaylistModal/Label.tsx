import { usePlaylistModalState } from "@features/Playlist";

export function Label() {
  const { type } = usePlaylistModalState();

  return (
    <label className="label py-1">
      <span className="label-text text-base font-semibold">
        {type === "create" ? "Playlist name" : "Update playlist name"}
      </span>
      <span className="label-text-alt text-xs opacity-70">
        Must be 100 characters
      </span>
    </label>
  );
}
