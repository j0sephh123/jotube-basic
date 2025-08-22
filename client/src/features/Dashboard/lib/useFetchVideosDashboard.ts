import type {
  FetchVideosDashboardQueryVariables} from "@/shared/api/generated/graphql";
import {
  useFetchVideosDashboardQuery
} from "@/shared/api/generated/graphql";

export default function useFetchVideosDashboard(
  variables?: FetchVideosDashboardQueryVariables
) {
  return useFetchVideosDashboardQuery({
    variables,
  });
}
