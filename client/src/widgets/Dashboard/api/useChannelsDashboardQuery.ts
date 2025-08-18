import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { ViewType } from "@/shared/hooks/useDashboardParams";
import { useFetchDashboard } from "@widgets/Dashboard/lib";
import { ViewType as GraphQLViewType } from "@/generated/graphql";

export type ChannelsDashboardResponseData =
  import("@/generated/graphql").ChannelsDashboardResponse;

const mapViewTypeToGraphQL = (
  viewType: string | undefined
): GraphQLViewType | undefined => {
  if (!viewType) return undefined;

  switch (viewType) {
    case "saved":
      return GraphQLViewType.Saved;
    case "processed":
      return GraphQLViewType.Processed;
    case "no-uploads":
      return GraphQLViewType.NoUploads;
    case "no-screenshots":
      return GraphQLViewType.NoScreenshots;
    case "thumbnails":
      return GraphQLViewType.Thumbnails;
    case "has-storyboards":
      return GraphQLViewType.HasStoryboards;
    default:
      return undefined;
  }
};

export function useChannelsDashboardQuery() {
  const { requestBody } = useStore();
  const params = useParams();

  const requestBodyWithViewType = {
    ...requestBody,
    viewType: mapViewTypeToGraphQL(params.viewType),
  };

  const { data, loading, error, refetch } = useFetchDashboard({
    fetchDashboardInput: requestBodyWithViewType,
  });

  return {
    data: data?.fetchDashboard as ChannelsDashboardResponseData | undefined,
    isLoading: loading,
    error,
    refetch,
  };
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
