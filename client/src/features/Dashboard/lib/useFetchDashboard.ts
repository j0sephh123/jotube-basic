import {
  useFetchDashboardQuery,
  FetchDashboardQueryVariables,
} from "@/shared/api/generated/graphql";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables
) {
  return useFetchDashboardQuery({
    variables,
  });
}
