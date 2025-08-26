import type {
  FetchDashboardQuery,
  FetchDashboardQueryVariables,
} from "@shared/api";
import { useFetchDashboardQuery } from "@shared/api";
import type { QueryHookOptions } from "@apollo/client";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables,
  options?: Omit<
    QueryHookOptions<FetchDashboardQuery, FetchDashboardQueryVariables>,
    "variables"
  >
) {
  return useFetchDashboardQuery({
    variables,
    ...options,
  });
}
