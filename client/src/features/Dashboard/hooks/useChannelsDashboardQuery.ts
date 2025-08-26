import { useParams } from "react-router-dom";
import { useDashboardContext, useFetchDashboard } from "@features/Dashboard";
import { ViewType as GraphQLViewType } from "@shared/api";
import type { ChannelsDashboardResponse } from "@shared/api";
import { useApolloClient } from "@apollo/client";

export type ChannelsDashboardResponseData = ChannelsDashboardResponse;

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
  const { requestBody } = useDashboardContext();
  const params = useParams();

  const requestBodyWithViewType = {
    ...requestBody,
    viewType: mapViewTypeToGraphQL(params.viewType),
  };

  const { data, loading, error, refetch } = useFetchDashboard(
    {
      fetchDashboardInput: requestBodyWithViewType,
    },
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  );

  return {
    data: data?.fetchDashboard,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchChannelsDashboardQuery() {
  const client = useApolloClient();

  return () => client.refetchQueries({ include: ["FetchDashboard"] });
}
