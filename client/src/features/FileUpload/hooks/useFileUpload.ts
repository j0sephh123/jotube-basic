import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nestFetcher, nestFetcherFile } from "@shared/api";
import type { UploadFile } from "@features/FileUpload";

const QUERY_KEYS = {
  uploadedFiles: ["uploadedFiles"] as const,
};

export const useFileUpload = () => {
  const queryClient = useQueryClient();

  const {
    data: uploadedFiles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.uploadedFiles,
    queryFn: async () => {
      const files = await nestFetcher<UploadFile[]>({
        method: "GET",
        url: "/file-upload/files",
      });
      return files;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

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
    uploadedFiles,
    isLoading,
    error,
    refetch,
    uploadFile: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    deleteFile: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
