import { openRangePicker } from "../rangePickerStore";
import { useParsedSearchParams } from "../hooks";
import { useReset } from "../hooks";

export function Trigger({
  minLabel,
  maxLabel,
}: {
  minLabel: string;
  maxLabel: string;
}) {
  const { min, max } = useParsedSearchParams();
  const open = () => openRangePicker();
  const reset = useReset();

  return (
    <div
      onClick={open}
      className="flex items-center justify-between rounded-xl border border-base-300 p-4 cursor-pointer hover:bg-base-200"
    >
      <div className="flex flex-col">
        <span className="text-sm opacity-70">{minLabel}</span>
        <span className="text-lg font-medium">{min ?? "Any"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm opacity-70">{maxLabel}</span>
        <span className="text-lg font-medium">{max ?? "Any"}</span>
      </div>
      <button onClick={reset} className="btn btn-sm btn-outline" type="button">
        Reset
      </button>
    </div>
  );
}
