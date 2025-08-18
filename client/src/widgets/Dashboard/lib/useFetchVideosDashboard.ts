import {
  useFetchVideosDashboardQuery,
  FetchVideosDashboardQueryVariables,
} from "@/generated/graphql";

export default function useFetchVideosDashboard(
  variables?: FetchVideosDashboardQueryVariables
) {
  return useFetchVideosDashboardQuery({
    variables,
  });
}
