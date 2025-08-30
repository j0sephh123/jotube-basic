import { usePlaylistModalState } from "@features/Playlist";

export function Actions({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const { type } = usePlaylistModalState();

  return (
    <div className="flex justify-end gap-3 mt-4">
      <button className="btn btn-outline" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => onSubmit()}
      >
        {type === "create" ? "Create Playlist" : "Update Playlist"}
      </button>
    </div>
  );
}
