import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nestFetcher, nestFetcherFile } from "@shared/api";
import type { UploadFile } from "@features/FileUpload";
import { QUERY_KEYS } from "./constants";

export const useFileUpload = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async ({
      file,
      episodeId,
    }: {
      file: File;
      episodeId: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("episodeId", episodeId);

      const result = await nestFetcherFile<UploadFile>({
        method: "POST",
        url: "/file-upload",
        body: formData,
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.uploadedFiles });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      await nestFetcher({
        method: "DELETE",
        url: `/file-upload/file/${fileId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.uploadedFiles });
    },
  });

  return {
    uploadFile: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    deleteFile: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
