import { SortOrder } from "@/shared/types/searchParams";
import { useSearchParams } from "react-router-dom";

type SortField = "createdAt" | "videoCount";

export default function useChannelsWithoutUploadsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = (searchParams.get("sortField") as SortField) || "createdAt";
  const direction = (searchParams.get("direction") as SortOrder) || "desc";

  const updateUrlParams = (newParams: Record<string, string>) => {
    setSearchParams((prev) => {
      const newSearchParams = new URLSearchParams(prev.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        newSearchParams.set(key, value);
      });
      return newSearchParams;
    });
  };

  return { sortField, direction, updateUrlParams };
}
