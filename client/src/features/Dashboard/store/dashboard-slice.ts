import { ViewType } from "@/shared/hooks/useTypedParams";
import { SortOrder } from "@/shared/types/searchParams";

export const defaults: {
  sortOrder: SortOrder;
  page: number;
  min: number;
  max: number | null;
  defaultMin: number;
  defaultMax: number | null;
  viewType: ViewType;
} = {
  sortOrder: "desc" as SortOrder,
  page: 1,
  min: 0,
  max: null as number | null,
  defaultMin: 0,
  defaultMax: null as number | null,
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
