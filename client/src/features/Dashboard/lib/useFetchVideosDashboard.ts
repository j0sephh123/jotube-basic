import {
  useFetchVideosDashboardQuery,
  FetchVideosDashboardQueryVariables,
} from "@/shared/api/generated/graphql";

export default function useFetchVideosDashboard(
  variables?: FetchVideosDashboardQueryVariables
) {
  return useFetchVideosDashboardQuery({
    variables,
  });
}
