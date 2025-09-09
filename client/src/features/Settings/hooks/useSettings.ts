import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

const QUERY_KEY = ["settings"];

export type SettingsI = {
  autoDownload: boolean;
};

export function useSettingsQuery() {
  return useQuery<SettingsI>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      nestFetcher<SettingsI>({
        method: "GET",
        url: "/settings",
      }),
  });
}

export function useSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation<SettingsI, Error, SettingsI>({
    mutationFn: (input) =>
      nestFetcher<SettingsI>({
        method: "POST",
        url: "/settings",
        body: input,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
