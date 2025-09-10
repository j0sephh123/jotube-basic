import { openRangePicker } from "../rangePickerStore";
import { useParsedSearchParams } from "../hooks";
import { useReset } from "../hooks";
import { type RangePickerProps } from "../types";
import { XIcon } from "lucide-react";

export function Trigger({
  minLabel,
  maxLabel,
  minKey,
  maxKey,
  identifier,
}: RangePickerProps) {
  const { min, max } = useParsedSearchParams({ minKey, maxKey, identifier });
  const open = () => openRangePicker(identifier);
  const reset = useReset({ minKey, maxKey, identifier });

  const hideReset = min === null && max === null;

  return (
    <div
      onClick={open}
      className="flex items-center justify-between rounded-xl p-2 cursor-pointer hover:bg-base-200"
    >
      <div className="flex flex-col">
        <span className="text-xs opacity-70">{minLabel}</span>
        <span className="text-lg font-medium">{min ?? "Any"}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs opacity-70">{maxLabel}</span>
        <span className="text-lg font-medium">{max ?? "Any"}</span>
      </div>
      {!hideReset && <XIcon onClick={reset} />}
    </div>
  );
}
