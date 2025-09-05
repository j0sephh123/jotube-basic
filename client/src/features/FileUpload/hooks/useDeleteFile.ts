import { QUERY_KEYS } from "./constants";
import { nestFetcher } from "@shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      episodeId,
      fileName,
    }: {
      episodeId: string;
      fileName: string;
    }) =>
      nestFetcher({
        method: "DELETE",
        url: `/file-upload/file/${episodeId}`,
        body: { fileName },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.uploadedFiles });
    },
  });
}
