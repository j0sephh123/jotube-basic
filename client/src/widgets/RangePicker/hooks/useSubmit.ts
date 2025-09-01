import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { closeRangePicker } from "../rangePickerStore";
import { type RangePickerKeys } from "../types";

export function useSubmit({ minKey, maxKey }: RangePickerKeys) {
  const [searchParams, setSearchParams] = useSearchParams();
  const close = () => closeRangePicker();

  const submit = useCallback(
    (draftMin: string, draftMax: string) => {
      const next = new URLSearchParams(searchParams);
      const m1 = draftMin.trim();
      const m2 = draftMax.trim();
      const vMin = m1 === "" ? null : Number(m1);
      const vMax = m2 === "" ? null : Number(m2);
      if (vMin !== null && Number.isNaN(vMin)) return;
      if (vMax !== null && Number.isNaN(vMax)) return;
      if (vMin !== null && vMax !== null && vMin > vMax) return;
      if (vMin === null) next.delete(minKey);
      else next.set(minKey, String(vMin));
      if (vMax === null) next.delete(maxKey);
      else next.set(maxKey, String(vMax));
      setSearchParams(next);
      close();
    },
    [maxKey, minKey, searchParams, setSearchParams]
  );

  return submit;
}
