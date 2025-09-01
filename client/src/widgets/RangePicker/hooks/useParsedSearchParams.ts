import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { parse } from "../lib";
import { type RangePickerKeys } from "../types";

export function useParsedSearchParams({ minKey, maxKey }: RangePickerKeys) {
  const [searchParams] = useSearchParams();
  return useMemo(
    () => parse(searchParams, minKey, maxKey),
    [searchParams, minKey, maxKey]
  );
}
