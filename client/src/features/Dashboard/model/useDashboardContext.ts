// Simplified local implementation to avoid cross-layer dependencies
export const useDashboardContext = () => {
  return {
    requestBody: {
      sortOrder: "DESC" as const,
      page: 1,
      min: 0,
      max: null,
      defaultMin: 0,
      defaultMax: null,
      viewType: "saved" as const,
    },
    viewType: "saved" as const,
    setRequestBody: (_key: string, _value: unknown) => {},
    setRequestBodyBatch: (_updates: Record<string, unknown>) => {},
    handleClearFilters: () => {},
  };
};
