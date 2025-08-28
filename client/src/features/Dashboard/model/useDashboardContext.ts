import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { create } from "zustand";

type DashboardRequestBody = {
  page: number;
  viewType: string;
};

type DashboardStore = {
  requestBody: DashboardRequestBody;
  setRequestBody: (key: string, value: unknown) => void;
  setRequestBodyBatch: (updates: Partial<DashboardRequestBody>) => void;
};

const useStore = create<DashboardStore>((set) => ({
  requestBody: {
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
  setRequestBodyBatch: (updates) => {
    set((state) => ({
      requestBody: {
        ...state.requestBody,
        ...updates,
      },
    }));
  },
}));

export const useDashboardContext = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const { requestBody, setRequestBody, setRequestBodyBatch } = useStore();

  const setRequestBodyWithUrl = useCallback(
    (key: string, value: unknown) => {
      const newParams = new URLSearchParams(urlSearchParams);
      if (value !== null && value !== undefined) {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
      setURLSearchParams(newParams);
      setRequestBody(key, value);
    },
    [urlSearchParams, setURLSearchParams, setRequestBody]
  );

  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams(urlSearchParams);
    newParams.set("page", "1");
    setURLSearchParams(newParams);

    setRequestBodyBatch({
      page: 1,
    });
  }, [urlSearchParams, setURLSearchParams, setRequestBodyBatch]);

  useEffect(() => {
    const params = Object.fromEntries(urlSearchParams.entries());
    const updates: Partial<DashboardRequestBody> = {};

    if (params.page) {
      const pageValue = parseInt(params.page, 10);
      if (!isNaN(pageValue) && pageValue > 0) {
        updates.page = pageValue;
      }
    }

    if (Object.keys(updates).length > 0) {
      setRequestBodyBatch(updates);
    }
  }, [urlSearchParams, setRequestBodyBatch]);

  return {
    requestBody,
    viewType: requestBody.viewType,
    setRequestBody: setRequestBodyWithUrl,
    setRequestBodyBatch,
    handleClearFilters,
  };
};
