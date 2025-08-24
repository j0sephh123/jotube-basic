import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { create } from "zustand";

type DashboardRequestBody = {
  sortOrder: "ASC" | "DESC";
  page: number;
  min: number;
  max: number | null;
  defaultMin: number;
  defaultMax: number | null;
  viewType: string;
};

type DashboardStore = {
  requestBody: DashboardRequestBody;
  setRequestBody: (key: string, value: unknown) => void;
  setRequestBodyBatch: (updates: Partial<DashboardRequestBody>) => void;
};

const useStore = create<DashboardStore>((set) => ({
  requestBody: {
    sortOrder: "DESC",
    page: 1,
    min: 0,
    max: null,
    defaultMin: 0,
    defaultMax: null,
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
    newParams.delete("min");
    newParams.delete("max");
    newParams.delete("defaultMin");
    newParams.delete("defaultMax");
    newParams.set("page", "1");
    setURLSearchParams(newParams);

    setRequestBodyBatch({
      min: 0,
      max: null,
      defaultMin: 0,
      defaultMax: null,
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

    if (params.min) {
      const minValue = parseInt(params.min, 10);
      if (!isNaN(minValue) && minValue >= 0) {
        updates.min = minValue;
      }
    }

    if (params.max) {
      const maxValue = parseInt(params.max, 10);
      if (!isNaN(maxValue) && maxValue > 0) {
        updates.max = maxValue;
      }
    }

    if (params.defaultMin) {
      const defaultMinValue = parseInt(params.defaultMin, 10);
      if (!isNaN(defaultMinValue) && defaultMinValue >= 0) {
        updates.defaultMin = defaultMinValue;
      }
    }

    if (params.defaultMax) {
      const defaultMaxValue = parseInt(params.defaultMax, 10);
      if (!isNaN(defaultMaxValue) && defaultMaxValue > 0) {
        updates.defaultMax = defaultMaxValue;
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
