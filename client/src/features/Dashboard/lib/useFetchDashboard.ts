import type { FetchDashboardQueryVariables } from "@shared/api";
import { useFetchDashboardQuery } from "@shared/api";
import type { ApolloQueryHookOptions } from "@apollo/client";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables,
  options?: Omit<
    ApolloQueryHookOptions<any, FetchDashboardQueryVariables>,
    "variables"
  >
) {
  return useFetchDashboardQuery({
    variables,
    ...options,
  });
}
