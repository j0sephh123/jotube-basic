import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { parse } from "../lib";

export function useParsedSearchParams() {
  const [searchParams] = useSearchParams();
  return useMemo(() => parse(searchParams), [searchParams]);
}
