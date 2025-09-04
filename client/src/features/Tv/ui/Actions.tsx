import { useTvModalState } from "@features/Tv";

export function Actions({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const { type } = useTvModalState();

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
        {type === "create" ? "Create TV" : "Update TV"}
      </button>
    </div>
  );
}
