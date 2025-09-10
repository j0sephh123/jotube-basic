import { closeRangePicker, useRangePickerState } from "../rangePickerStore";
import { useSubmit } from "../hooks";
import { type RangePickerKeys } from "../types";

export function Actions({ minKey, maxKey, identifier }: RangePickerKeys) {
  const { draftMin, draftMax } = useRangePickerState(identifier);
  const close = () => closeRangePicker(identifier);
  const submit = useSubmit({ minKey, maxKey, identifier });

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
