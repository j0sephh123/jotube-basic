import { closeRangePicker, useRangePickerState } from "../rangePickerStore";
import { useSubmit } from "../hooks";

export function Actions() {
  const { draftMin, draftMax } = useRangePickerState();
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
