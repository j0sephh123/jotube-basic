import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export type SaveUploadItem = {
  ytVideoId: string;
  ytChannelId: string;
};

export type SaveUploadRequest = {
  uploads: SaveUploadItem[];
};

export function useSaveUpload(onSuccess: () => void) {
  const { mutateAsync } = useMutation<unknown, unknown, SaveUploadRequest>({
    mutationFn: (body: SaveUploadRequest) =>
      nestFetcher({
        url: "/uploads-video/save-upload",
        method: "POST",
        body,
      }),
    onSuccess: () => {
      onSuccess();
    },
  });

  return mutateAsync;
}
