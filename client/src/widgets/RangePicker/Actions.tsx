export function Actions({
  close,
  submit,
}: {
  close: () => void;
  submit: () => void;
}) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button onClick={close} className="btn btn-outline btn-lg" type="button">
        Cancel
      </button>
      <button onClick={submit} className="btn btn-primary btn-lg" type="button">
        Apply
      </button>
    </div>
  );
}
