import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { type RangePickerKeys } from "../types";

export function useReset({ minKey, maxKey }: RangePickerKeys) {
  const [searchParams, setSearchParams] = useSearchParams();

  const reset = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const next = new URLSearchParams(searchParams);
      next.delete(minKey);
      next.delete(maxKey);
      setSearchParams(next);
    },
    [searchParams, setSearchParams, minKey, maxKey]
  );

  return reset;
}
