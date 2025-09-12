export function Actions({
  onCancel,
  onSubmit,
  disabled = false,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button className="btn btn-outline" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => onSubmit()}
        disabled={disabled}
      >
        Create TV
      </button>
    </div>
  );
}
