import { useFetchDashboard, useFinalPage } from "@features/Dashboard";
import { useApolloClient } from "@apollo/client";
import { useFinalSortOrder } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { type FetchDashboardInput } from "@shared/api";

export function useChannelsDashboardQuery() {
  const viewType = useTypedParams("ViewType");
  const [searchParams] = useSearchParams();

  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const defaultMin = searchParams.get("defaultMin");
  const defaultMax = searchParams.get("defaultMax");

  const { finalSortOrder } = useFinalSortOrder();
  const { finalPage } = useFinalPage();

  const fetchDashboardInput: FetchDashboardInput = {
    page: finalPage,
    viewType,
    sortOrder: finalSortOrder,
  };

  if (min !== null) {
    fetchDashboardInput.min = parseInt(min);
  }

  if (max !== null) {
    fetchDashboardInput.max = parseInt(max);
  }

  if (defaultMin !== null) {
    fetchDashboardInput.defaultMin = parseInt(defaultMin);
  }

  if (defaultMax !== null) {
    fetchDashboardInput.defaultMax = parseInt(defaultMax);
  }

  const { data, loading, error, refetch } = useFetchDashboard(
    {
      fetchDashboardInput,
    },
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  );

  if (error) {
    console.error(error);
  }

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
