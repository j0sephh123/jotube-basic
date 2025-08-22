import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "@/app/providers/store/store";
import { videosDefaults } from "@/features/Dashboard/model/videos-dashboard-slice";
import type { SortOrder } from "@/shared/api/generated/graphql";

type VideosRequestBody =
  | "sortOrder"
  | "page"
  | "minScreenshots"
  | "maxScreenshots";

const URL_PARAMS: readonly VideosRequestBody[] = [
  "sortOrder",
  "page",
  "minScreenshots",
  "maxScreenshots",
];

const NULLABLE_PARAMS: readonly VideosRequestBody[] = [
  "minScreenshots",
  "maxScreenshots",
];

export const useVideosDashboardContext = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
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
      (params.sortOrder === "ASC" || params.sortOrder === "DESC")
    ) {
      newRequestBody.sortOrder = params.sortOrder as SortOrder;
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

    useStore.setState({ videosRequestBody: newRequestBody });
  }, [urlSearchParams]);

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
      page: 1,
    });
  }, [urlSearchParams, setURLSearchParams, setVideosRequestBodyBatch]);

  return {
    videosRequestBody,
    setVideosRequestBody: setVideosRequestBodyWithUrl,
    setVideosRequestBodyBatch,
    handleClearFilters,
  };
};
