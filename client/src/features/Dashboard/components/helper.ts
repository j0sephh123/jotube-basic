/* eslint-disable @typescript-eslint/no-explicit-any */
export const defaults: any = {
  sortOrder: "desc",
  page: 1,
  min: 0,
  max: null,
  defaultMin: 0,
  defaultMax: null,
  viewType: "saved",
};

export type EditableChannel = {
  ytChannelId: string;
};

export type RealDashboardContextType = {
  requestBody: any;
  setRequestBody: <K extends keyof any>(key: K, value: any[K]) => void;
  handleClearFilters: () => void;
};
