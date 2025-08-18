import { useMutation, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/rest/nestFetcher";

export function useDeleteScreenshot(
  month: string | undefined,
  date: string | undefined
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screenshots", month, date] });
    },
  });
}
