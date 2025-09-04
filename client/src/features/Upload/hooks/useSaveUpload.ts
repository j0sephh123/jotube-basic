import {
  type SaveUploadMutationVariables,
  useSaveUploadMutation,
} from "@shared/api";

export function useSaveUpload(onSuccess: () => void) {
  const [saveUploadMutation] = useSaveUploadMutation({
    onCompleted: () => {
      onSuccess();
    },
  });

  return (body: SaveUploadMutationVariables["saveUploadInput"]) =>
    saveUploadMutation({
      variables: {
        saveUploadInput: body,
      },
    });
}
