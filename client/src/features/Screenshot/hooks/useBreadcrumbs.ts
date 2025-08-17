import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function useBreadcrumbs(path: string) {
  const { month, date } = useParams();

  const array = [path, month, date].filter(Boolean) as string[];

  const items = useMemo(() => {
    if (array.length === 1) {
      return [{ label: "Screenshots", path: "/screenshots" }];
    }

    if (array.length === 2) {
      return [
        { label: "Screenshots", path: "/screenshots" },
        { label: month || "", path: `/screenshots/${month}` },
      ];
    }

    if (array.length === 3) {
      return [
        { label: "Screenshots", path: "/screenshots" },
        { label: month || "", path: `/screenshots/${month}` },
        { label: date || "", path: `/screenshots/${month}/${date}` },
      ];
    }

    return [];
  }, [array.length, month, date]);

  return items;
}
