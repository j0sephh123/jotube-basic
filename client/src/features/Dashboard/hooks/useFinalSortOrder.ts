import { useSearchParams } from "react-router-dom";
import type { FinalSortOrder } from "@features/Dashboard";
import { useCallback } from "react";

const getSortOrder = (urlSearchParams: URLSearchParams): FinalSortOrder => {
  if (!urlSearchParams.get("sortOrder")) {
    return "desc" as FinalSortOrder;
  }

  return urlSearchParams.get("sortOrder") as FinalSortOrder;
};

export function useFinalSortOrder() {
  const [urlSearchParams, setSearchParams] = useSearchParams();

  const finalSortOrder = getSortOrder(urlSearchParams);

  const toggleSortOrder = useCallback(() => {
    const newSortOrder = finalSortOrder === "asc" ? "desc" : "asc";
    setSearchParams({
      ...Object.fromEntries(urlSearchParams),
      sortOrder: newSortOrder,
    });
  }, [finalSortOrder, setSearchParams, urlSearchParams]);

  return { finalSortOrder, toggleSortOrder };
}
