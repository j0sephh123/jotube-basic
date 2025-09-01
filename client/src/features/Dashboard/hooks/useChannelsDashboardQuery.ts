import { useFetchDashboard, useFinalPage } from "@features/Dashboard";
import { useApolloClient } from "@apollo/client";
import { useFinalSortOrder } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";

export function useChannelsDashboardQuery() {
  const viewType = useTypedParams("ViewType");

  const { finalSortOrder } = useFinalSortOrder();
  const { finalPage } = useFinalPage();

  const { data, loading, error, refetch } = useFetchDashboard(
    {
      fetchDashboardInput: {
        page: finalPage,
        viewType,
        sortOrder: finalSortOrder,
      },
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
