import { useParams } from "react-router-dom";
import {
  useFetchVideosDashboard,
  useFinalPage,
  useFinalSortOrder,
} from "@features/Dashboard";
import type { VideosDashboardResponse } from "@shared/api";
import { useApolloClient } from "@apollo/client";

export type VideosDashboardResponseData = VideosDashboardResponse;

export function useVideosDashboardQuery() {
  const params = useParams();

  const { finalSortOrder } = useFinalSortOrder();
  const { finalPage } = useFinalPage();

  const { data, loading, error, refetch } = useFetchVideosDashboard({
    page: finalPage,
    sortOrder: finalSortOrder.toLowerCase() as "asc" | "desc",
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
