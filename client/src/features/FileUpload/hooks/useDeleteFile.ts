import { QUERY_KEYS } from "./constants";
import { nestFetcher } from "@shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) =>
      nestFetcher({
        method: "DELETE",
        url: `/file-upload/file/${fileId}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.uploadedFiles });
    },
  });
}
