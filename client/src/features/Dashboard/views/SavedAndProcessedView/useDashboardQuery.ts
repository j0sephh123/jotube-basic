import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { useParams } from "react-router-dom";
import { DashboardChannel } from "../types";
import { useCallback } from "react";
import { ViewType } from "@/shared/hooks/useTypedParams";

type Upload = {
  id: number;
  title: string;
  ytId: string;
  src: string;
  status: number;
  publishedAt: string;
  duration: number;
  amountOfSavedScreenshots: number;
};

type Screenshot = {
  ytVideoId: string;
  second: number;
};

type Item = DashboardChannel & {
  lastSyncedAt: string | null;
  saved?: number;
  thumbnails: number;
  defaults?: number;
  uploadsWithScreenshots?: number;
  screenshotsCount?: number;
  uploads?: Upload[];
  screenshots: Screenshot[];
};

export type DashboardResponseData = {
  channels: Item[];
  total: number;
};

export function useDashboardQuery() {
  const { requestBody } = useStore();
  const params = useParams();

  const requestBodyWithViewType = {
    ...requestBody,
    viewType: params.viewType,
  };

  return useQuery<DashboardResponseData>({
    queryKey: ["dashboard", requestBodyWithViewType],
    queryFn: () =>
      nestFetcher<DashboardResponseData>({
        method: "POST",
        url: "/dashboard",
        body: requestBodyWithViewType,
      }),
  });
}

export function useRefetchNoUploadsView() {
  const queryClient = useQueryClient();
  const { requestBody } = useStore();
  const params = useParams();

  return useCallback(() => {
    const requestBodyWithViewType = {
      ...requestBody,
      viewType: params.viewType,
    };
    queryClient.refetchQueries({
      queryKey: ["dashboard", requestBodyWithViewType],
    });
  }, [queryClient, requestBody, params.viewType]);
}

export function useRefetchGroupedThumbnails() {
  const queryClient = useQueryClient();
  const { requestBody } = useStore();

  return useCallback(() => {
    const requestBodyWithViewType = {
      ...requestBody,
      viewType: ViewType.THUMBNAILS,
    };
    queryClient.refetchQueries({
      queryKey: ["dashboard", requestBodyWithViewType],
    });
  }, [queryClient, requestBody]);
}
