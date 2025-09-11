import { useFinalSortOrder } from "@features/Dashboard";
import {
  type FetchVideosDashboardQueryVariables,
  useFetchVideosDashboardQuery,
  type VideosDashboardResponse,
} from "@shared/api";
import { useApolloClient } from "@apollo/client";
import { useParams, useSearchParams } from "react-router-dom";

export type VideosDashboardResponseData = VideosDashboardResponse;

export function useVideosDashboardQuery() {
  const { videosDashboardViewType } = useParams<{
    videosDashboardViewType: string;
  }>();
  const { finalSortOrder } = useFinalSortOrder();
  const [searchParams] = useSearchParams();
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const variables: FetchVideosDashboardQueryVariables = {
    fetchVideosDashboardInput: {
      sortOrder: finalSortOrder.toLowerCase() as "asc" | "desc",
      videosDashboardViewType: videosDashboardViewType ?? "with-screenshots",
    },
  };

  if (min !== null) {
    variables.fetchVideosDashboardInput.screenshotMin = parseInt(min);
  }

  if (max !== null) {
    variables.fetchVideosDashboardInput.screenshotMax = parseInt(max);
  }

  console.log(variables);

  const { data, loading, error, refetch } = useFetchVideosDashboardQuery({
    variables,
  });

  return {
    data: data?.fetchVideosDashboard,
    isLoading: loading,
    error,
    refetch,
  };
}

export function useRefetchVideosDashboardQuery() {
  const client = useApolloClient();

  return () => client.refetchQueries({ include: ["FetchVideosDashboard"] });
}
