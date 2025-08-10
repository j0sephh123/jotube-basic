import { useEffect, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { videosDefaults } from "../store/videos-dashboard-slice";
import { ViewType } from "@/shared/hooks/useDashboardParams";

type VideosRequestBody =
  | "sortOrder"
  | "page"
  | "minScreenshots"
  | "maxScreenshots"
  | "defaultMinScreenshots"
  | "defaultMaxScreenshots"
  | "viewType";

const URL_PARAMS: readonly VideosRequestBody[] = [
  "sortOrder",
  "page",
  "minScreenshots",
  "maxScreenshots",
  "defaultMinScreenshots",
  "defaultMaxScreenshots",
  "viewType",
];

const NULLABLE_PARAMS: readonly VideosRequestBody[] = [
  "minScreenshots",
  "maxScreenshots",
  "defaultMinScreenshots",
  "defaultMaxScreenshots",
];

export const useVideosDashboardContext = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const { viewType } = useParams();
  const { videosRequestBody, setVideosRequestBody } = useStore();

  const setVideosRequestBodyWithUrl = useCallback(
    <K extends keyof typeof videosDefaults>(
      key: K,
      value: (typeof videosDefaults)[K]
    ): void => {
      const stringKey = String(key);
      if (URL_PARAMS.includes(stringKey as VideosRequestBody)) {
        const newParams = new URLSearchParams(urlSearchParams);

        if (NULLABLE_PARAMS.includes(stringKey as VideosRequestBody)) {
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

      setVideosRequestBody(key as VideosRequestBody, value);
    },
    [urlSearchParams, setURLSearchParams, setVideosRequestBody]
  );

  const setVideosRequestBodyBatch = useCallback(
    (updates: Partial<typeof videosDefaults>): void => {
      const newParams = new URLSearchParams(urlSearchParams);
      let hasChanges = false;

      Object.entries(updates).forEach(([key, value]) => {
        const stringKey = String(key);
        if (URL_PARAMS.includes(stringKey as VideosRequestBody)) {
          if (NULLABLE_PARAMS.includes(stringKey as VideosRequestBody)) {
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
        if (key in videosDefaults) {
          setVideosRequestBody(
            key as VideosRequestBody,
            value as (typeof videosDefaults)[keyof typeof videosDefaults]
          );
        }
      });
    },
    [urlSearchParams, setURLSearchParams, setVideosRequestBody]
  );

  useEffect(() => {
    const params = Object.fromEntries(urlSearchParams.entries());

    const newRequestBody = { ...videosDefaults };

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

    if (params.minScreenshots) {
      const minValue = parseInt(params.minScreenshots, 10);
      if (!isNaN(minValue) && minValue >= 0) {
        newRequestBody.minScreenshots = minValue;
      }
    }

    if (params.maxScreenshots) {
      const maxValue = parseInt(params.maxScreenshots, 10);
      if (!isNaN(maxValue) && maxValue > 0) {
        newRequestBody.maxScreenshots = maxValue;
      }
    }

    if (params.defaultMinScreenshots) {
      const defaultMinValue = parseInt(params.defaultMinScreenshots, 10);
      if (!isNaN(defaultMinValue) && defaultMinValue >= 0) {
        newRequestBody.defaultMinScreenshots = defaultMinValue;
      }
    }

    if (params.defaultMaxScreenshots) {
      const defaultMaxValue = parseInt(params.defaultMaxScreenshots, 10);
      if (!isNaN(defaultMaxValue) && defaultMaxValue > 0) {
        newRequestBody.defaultMaxScreenshots = defaultMaxValue;
      }
    }

    if (
      params.viewType &&
      Object.values(ViewType).includes(params.viewType as ViewType)
    ) {
      newRequestBody.viewType = params.viewType as ViewType;
    }

    useStore.setState({ videosRequestBody: newRequestBody });
  }, [urlSearchParams]);

  useEffect(() => {
    if (viewType && Object.values(ViewType).includes(viewType as ViewType)) {
      setVideosRequestBody("viewType", viewType as ViewType);
    }
  }, [viewType, setVideosRequestBody]);

  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams(urlSearchParams);
    newParams.delete("minScreenshots");
    newParams.delete("maxScreenshots");
    newParams.delete("defaultMinScreenshots");
    newParams.delete("defaultMaxScreenshots");
    newParams.set("page", "1");
    setURLSearchParams(newParams);

    setVideosRequestBodyBatch({
      minScreenshots: undefined,
      maxScreenshots: undefined,
      defaultMinScreenshots: undefined,
      defaultMaxScreenshots: undefined,
      page: 1,
    });
  }, [urlSearchParams, setURLSearchParams, setVideosRequestBodyBatch]);

  return {
    videosRequestBody,
    viewType,
    setVideosRequestBody: setVideosRequestBodyWithUrl,
    setVideosRequestBodyBatch,
    handleClearFilters,
  };
};
