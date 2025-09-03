import { useEffect } from "react";
import { setDraftMin, setDraftMax } from "../rangePickerStore";
import { useRangePickerState } from "../rangePickerStore";
import { useParsedSearchParams } from "./useParsedSearchParams";
import { type RangePickerKeys } from "../types";

export function useSetValues({ minKey, maxKey }: RangePickerKeys) {
  const { isOpen } = useRangePickerState();
  const { min, max } = useParsedSearchParams({ minKey, maxKey });

  useEffect(() => {
    if (isOpen) {
      setDraftMin(min === null ? "" : String(min));
      setDraftMax(max === null ? "" : String(max));
    }
  }, [isOpen, min, max, minKey, maxKey]);
}
