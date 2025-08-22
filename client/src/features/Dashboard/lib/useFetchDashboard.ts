import type { FetchDashboardQueryVariables } from "@shared/api";
import { useFetchDashboardQuery } from "@shared/api";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables
) {
  return useFetchDashboardQuery({
    variables,
  });
}
