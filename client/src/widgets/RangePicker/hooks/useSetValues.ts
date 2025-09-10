import { useEffect } from "react";
import { setDraftMin, setDraftMax } from "../rangePickerStore";
import { useRangePickerState } from "../rangePickerStore";
import { useParsedSearchParams } from "./useParsedSearchParams";
import { type RangePickerKeys } from "../types";

export function useSetValues({ minKey, maxKey, identifier }: RangePickerKeys) {
  const { isOpen } = useRangePickerState(identifier);
  const { min, max } = useParsedSearchParams({ minKey, maxKey, identifier });

  useEffect(() => {
    if (isOpen) {
      setDraftMin(identifier, min === null ? "" : String(min));
      setDraftMax(identifier, max === null ? "" : String(max));
    }
  }, [isOpen, min, max, minKey, maxKey, identifier]);
}
