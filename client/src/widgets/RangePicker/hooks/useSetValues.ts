import { useEffect } from "react";
import { setDraftMin, setDraftMax } from "../rangePickerStore";
import { useRangePickerState } from "../rangePickerStore";
import { useParsedSearchParams } from "./useParsedSearchParams";

export function useSetValues() {
  const { isOpen } = useRangePickerState();
  const { min, max } = useParsedSearchParams();

  useEffect(() => {
    if (isOpen) {
      setDraftMin(min === null ? "" : String(min));
      setDraftMax(max === null ? "" : String(max));
    }
  }, [isOpen, min, max]);
}
