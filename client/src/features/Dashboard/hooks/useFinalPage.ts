import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const getPage = (urlSearchParams: URLSearchParams): number => {
  if (!urlSearchParams.get("page")) {
    return 1;
  }

  return parseInt(urlSearchParams.get("page") || "1", 10);
};

export function useFinalPage() {
  const [urlSearchParams, setSearchParams] = useSearchParams();

  const finalPage = getPage(urlSearchParams);

  const togglePage = useCallback(
    (newPage: number) => {
      const page = newPage ?? 1;
      setSearchParams({
        ...Object.fromEntries(urlSearchParams),
        page: page.toString(),
      });
    },
    [setSearchParams, urlSearchParams]
  );

  return { finalPage, togglePage };
}
