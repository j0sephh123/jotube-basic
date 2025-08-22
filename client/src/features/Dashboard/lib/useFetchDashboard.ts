import type {
  FetchDashboardQueryVariables} from "@/shared/api/generated/graphql";
import {
  useFetchDashboardQuery
} from "@/shared/api/generated/graphql";

export default function useFetchDashboard(
  variables: FetchDashboardQueryVariables
) {
  return useFetchDashboardQuery({
    variables,
  });
}
