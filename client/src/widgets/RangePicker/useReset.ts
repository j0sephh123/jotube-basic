import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useReset() {
  const [searchParams, setSearchParams] = useSearchParams();

  const reset = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = new URLSearchParams(searchParams);
    next.delete("min");
    next.delete("max");
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  return reset;
}
