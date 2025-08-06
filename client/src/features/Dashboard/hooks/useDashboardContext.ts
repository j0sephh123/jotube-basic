import { useEffect, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { defaults } from "../store/dashboard-slice";
import { ViewType } from "@/shared/hooks/useTypedParams";

type RequestBody =
  | "sortOrder"
  | "page"
  | "min"
  | "max"
  | "defaultMin"
  | "defaultMax"
  | "viewType";

const URL_PARAMS: readonly RequestBody[] = [
  "sortOrder",
  "page",
  "min",
  "max",
  "defaultMin",
  "defaultMax",
  "viewType",
];

const NULLABLE_PARAMS: readonly RequestBody[] = [
  "min",
  "max",
  "defaultMin",
  "defaultMax",
];

export const useDashboardContext = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const { viewType } = useParams();
  const { requestBody, setRequestBody } = useStore();

  const setRequestBodyWithUrl = useCallback(
    <K extends keyof typeof defaults>(
      key: K,
      value: (typeof defaults)[K]
    ): void => {
      const stringKey = String(key);
      if (URL_PARAMS.includes(stringKey as RequestBody)) {
        const newParams = new URLSearchParams(urlSearchParams);

        if (NULLABLE_PARAMS.includes(stringKey as RequestBody)) {
          if (value === null || value === undefined) {
            newParams.delete(stringKey);
          } else {
            newParams.set(stringKey, value.toString());
          }
        } else {
          if (value) {
            newParams.set(stringKey, value.toString());
          } else {
            newParams.delete(stringKey);
          }
        }

        setURLSearchParams(newParams);
      }

      setRequestBody(key as RequestBody, value);
    },
    [urlSearchParams, setURLSearchParams, setRequestBody]
  );

  const setRequestBodyBatch = useCallback(
    (updates: Partial<typeof defaults>): void => {
      const newParams = new URLSearchParams(urlSearchParams);
      let hasChanges = false;

      Object.entries(updates).forEach(([key, value]) => {
        const stringKey = String(key);
        if (URL_PARAMS.includes(stringKey as RequestBody)) {
          if (NULLABLE_PARAMS.includes(stringKey as RequestBody)) {
            if (value === null || value === undefined) {
              newParams.delete(stringKey);
            } else {
              newParams.set(stringKey, value.toString());
            }
          } else {
            if (value) {
              newParams.set(stringKey, value.toString());
            } else {
              newParams.delete(stringKey);
            }
          }
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setURLSearchParams(newParams);
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (key in defaults) {
          setRequestBody(
            key as RequestBody,
            value as (typeof defaults)[keyof typeof defaults]
          );
        }
      });
    },
    [urlSearchParams, setURLSearchParams, setRequestBody]
  );

  useEffect(() => {
    const params = Object.fromEntries(urlSearchParams.entries());

    const newRequestBody = { ...defaults };

    if (
      params.sortOrder &&
      (params.sortOrder === "asc" || params.sortOrder === "desc")
    ) {
      newRequestBody.sortOrder = params.sortOrder;
    }

    if (params.page) {
      const pageValue = parseInt(params.page, 10);
      if (!isNaN(pageValue) && pageValue > 0) {
        newRequestBody.page = pageValue;
      }
    }

    if (params.min) {
      const minValue = parseInt(params.min, 10);
      if (!isNaN(minValue) && minValue >= 0) {
        newRequestBody.min = minValue;
      }
    }

    if (params.max) {
      const maxValue = parseInt(params.max, 10);
      if (!isNaN(maxValue) && maxValue > 0) {
        newRequestBody.max = maxValue;
      }
    }

    if (params.defaultMin) {
      const defaultMinValue = parseInt(params.defaultMin, 10);
      if (!isNaN(defaultMinValue) && defaultMinValue >= 0) {
        newRequestBody.defaultMin = defaultMinValue;
      }
    }

    if (params.defaultMax) {
      const defaultMaxValue = parseInt(params.defaultMax, 10);
      if (!isNaN(defaultMaxValue) && defaultMaxValue > 0) {
        newRequestBody.defaultMax = defaultMaxValue;
      }
    }

    if (
      params.viewType &&
      Object.values(ViewType).includes(params.viewType as ViewType)
    ) {
      newRequestBody.viewType = params.viewType as ViewType;
    }

    useStore.setState({ requestBody: newRequestBody });
  }, [urlSearchParams]);

  useEffect(() => {
    if (viewType && Object.values(ViewType).includes(viewType as ViewType)) {
      setRequestBody("viewType", viewType as ViewType);
    }
  }, [viewType, setRequestBody]);

  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams(urlSearchParams);
    newParams.delete("min");
    newParams.delete("max");
    newParams.delete("defaultMin");
    newParams.delete("defaultMax");
    newParams.set("page", "1");
    setURLSearchParams(newParams);

    setRequestBodyBatch({
      min: undefined,
      max: undefined,
      defaultMin: undefined,
      defaultMax: undefined,
      page: 1,
    });
  }, [urlSearchParams, setURLSearchParams, setRequestBodyBatch]);

  return {
    requestBody,
    viewType,
    setRequestBody: setRequestBodyWithUrl,
    setRequestBodyBatch,
    handleClearFilters,
  };
};
