import type { FetchVideosDashboardQueryVariables } from "@shared/api";
import { useFetchVideosDashboardQuery } from "@shared/api";

export default function useFetchVideosDashboard(
  variables?: FetchVideosDashboardQueryVariables
) {
  return useFetchVideosDashboardQuery({
    variables,
  });
}
