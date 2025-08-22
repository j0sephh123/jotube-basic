import { useEffect } from "react";

// Local hook implementations to avoid cross-layer dependencies
const useLocalDashboardParams = () => {
  return {
    type: "channels" as const,
    viewType: "saved" as const,
  };
};

const useLocalStore = () => {
  return {
    setRequestBody: (_key: string, _value: unknown) => {},
    requestBody: {
      sortOrder: "DESC" as const,
      page: 1,
      min: 0,
      max: null,
      defaultMin: 0,
      defaultMax: null,
      viewType: "saved" as const,
    },
  };
};

export function useDashboardStore() {
  const { type, viewType } = useLocalDashboardParams();
  const { setRequestBody, requestBody } = useLocalStore();

  useEffect(() => {
    if (viewType) {
      setRequestBody("viewType", viewType);
    }
  }, [viewType, setRequestBody]);

  return { type, requestBody };
}
