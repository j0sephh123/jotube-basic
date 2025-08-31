import { closeRangePicker } from "./rangePickerStore";
import { useSubmit } from "./useSubmit";

export function Actions({
  draftMin,
  draftMax,
}: {
  draftMin: string;
  draftMax: string;
}) {
  const close = () => closeRangePicker();
  const submit = useSubmit();

  return (
    <div className="mt-8 flex justify-center gap-4">
      <button onClick={close} className="btn btn-outline btn-lg" type="button">
        Cancel
      </button>
      <button
        onClick={() => submit(draftMin, draftMax)}
        className="btn btn-primary btn-lg"
        type="button"
      >
        Apply
      </button>
    </div>
  );
}
