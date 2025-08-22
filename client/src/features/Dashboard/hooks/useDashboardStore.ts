import { useStore } from "@app/providers/store/store";
import { useDashboardParams } from "../lib/useDashboardParams";
import { useEffect } from "react";

export function useDashboardStore() {
  const { type, viewType } = useDashboardParams();
  const { setRequestBody } = useStore();

  useEffect(() => {
    if (viewType) {
      setRequestBody("viewType", viewType);
    }
  }, [viewType, setRequestBody]);

  return { type };
}
