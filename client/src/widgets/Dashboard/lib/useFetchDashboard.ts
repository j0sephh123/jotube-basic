import {
  useFetchDashboardQuery,
  FetchDashboardQueryVariables,
} from "@/generated/graphql";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables
) {
  return useFetchDashboardQuery({
    variables,
  });
}
