import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { parse } from "./parse";

export function useParsedSearchParams() {
  const [searchParams] = useSearchParams();
  return useMemo(() => parse(searchParams), [searchParams]);
}
