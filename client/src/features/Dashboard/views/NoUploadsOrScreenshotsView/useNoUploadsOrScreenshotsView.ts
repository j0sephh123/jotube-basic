import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { DashboardChannel } from "../types";
import { useTypedViewType } from "@/shared/hooks/useTypedParams";

type Response = DashboardChannel[];

export function useNoUploadsOrScreenshotsView() {
  const viewType = useTypedViewType();

  return useQuery<Response>({
    queryKey: ["dashboard/no-uploads", viewType],
    queryFn: () =>
      nestFetcher<Response>({
        method: "GET",
        url: `/dashboard/no-uploads-or-screenshots?viewType=${viewType}`,
      }),
  });
}

export function useRefetchNoUploadsView() {
  const queryClient = useQueryClient();
  const viewType = useTypedViewType();

  return () =>
    queryClient.resetQueries({ queryKey: ["dashboard/no-uploads", viewType] });
}
