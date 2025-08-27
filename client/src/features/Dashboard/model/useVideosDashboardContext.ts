import { useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { create } from "zustand";
import { videosDefaults } from "./videos-dashboard-slice";
import type { SortOrder } from "@shared/api";

// Local store implementation to avoid importing from app layer
type VideosDashboardStore = {
  videosRequestBody: typeof videosDefaults;
  setVideosRequestBody: <K extends keyof typeof videosDefaults>(
    key: K,
    value: (typeof videosDefaults)[K]
  ) => void;
};

const useStore = create<VideosDashboardStore>((set) => ({
  videosRequestBody: { ...videosDefaults },
  setVideosRequestBody: (key, value) => {
    set((state) => ({
      videosRequestBody: {
        ...state.videosRequestBody,
        [key]: value,
        page: key === "page" ? (value as number) : state.videosRequestBody.page,
      },
    }));
  },
}));

type VideosRequestBody = "sortOrder" | "page";

const URL_PARAMS: readonly VideosRequestBody[] = ["sortOrder", "page"];

const NULLABLE_PARAMS: readonly VideosRequestBody[] = [];

export const useVideosDashboardContext = () => {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const { videosRequestBody, setVideosRequestBody } = useStore();
  const lastUrlParams = useRef<string>("");

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
    const currentUrlParams = urlSearchParams.toString();
    if (currentUrlParams === lastUrlParams.current) return;

    lastUrlParams.current = currentUrlParams;
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

    useStore.setState({ videosRequestBody: newRequestBody });
  }, [urlSearchParams]);

  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams(urlSearchParams);
    newParams.set("page", "1");
    setURLSearchParams(newParams);

    setVideosRequestBodyBatch({
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
