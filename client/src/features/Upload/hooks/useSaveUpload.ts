import { useSaveUploadMutation } from "@shared/api";

export type SaveUploadItem = {
  ytVideoId: string;
  ytChannelId: string;
};

export type SaveUploadRequest = {
  uploads: SaveUploadItem[];
};

export function useSaveUpload(onSuccess: () => void) {
  const [saveUploadMutation] = useSaveUploadMutation({
    onCompleted: () => {
      onSuccess();
    },
  });

  return (body: SaveUploadRequest) => {
    return saveUploadMutation({
      variables: {
        saveUploadInput: body,
      },
    });
  };
}
