import type { SortOrder } from "@shared/api";
import { ViewType } from "@features/Dashboard";

export const defaults: {
  sortOrder: SortOrder;
  page: number;
  viewType: ViewType;
} = {
  sortOrder: "DESC" as SortOrder,
  page: 1,
  viewType: ViewType.SAVED,
};

export type DashboardSlice = {
  requestBody: typeof defaults;
  setRequestBody: <K extends keyof typeof defaults>(
    key: K,
    value: (typeof defaults)[K]
  ) => void;
};

export const createDashboardSlice = (
  set: (
    fn: (state: { requestBody: typeof defaults }) => {
      requestBody: typeof defaults;
    }
  ) => void
): DashboardSlice => ({
  requestBody: { ...defaults },

  setRequestBody: (key, value) => {
    set((state) => ({
      requestBody: {
        ...state.requestBody,
        [key]: value,
        page: key === "page" ? (value as number) : state.requestBody.page,
      },
    }));
  },
});
