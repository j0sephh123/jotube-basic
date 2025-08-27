import { useEffect } from "react";
import { create } from "zustand";
import { useDashboardParams } from "../lib";

type DashboardStore = {
  requestBody: {
    sortOrder: "ASC" | "DESC";
    page: number;
    viewType: string;
  };
  setRequestBody: (key: string, value: unknown) => void;
};

const useStore = create<DashboardStore>((set) => ({
  requestBody: {
    sortOrder: "DESC",
    page: 1,
    viewType: "saved",
  },
  setRequestBody: (key, value) => {
    set((state) => ({
      requestBody: {
        ...state.requestBody,
        [key]: value,
      },
    }));
  },
}));

export function useDashboardStore() {
  const { type, viewType } = useDashboardParams();
  const { setRequestBody, requestBody } = useStore();

  useEffect(() => {
    if (viewType) {
      setRequestBody("viewType", viewType);
    }
  }, [viewType, setRequestBody]);

  return { type, requestBody };
}
