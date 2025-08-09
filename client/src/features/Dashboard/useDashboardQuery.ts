import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { useParams } from "react-router-dom";
import { DashboardChannel } from "./types";
import { useCallback } from "react";
import { ViewType } from "@/shared/hooks/useDashboardParams";

export type DashboardResponseData = {
  channels: DashboardChannel[];
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
