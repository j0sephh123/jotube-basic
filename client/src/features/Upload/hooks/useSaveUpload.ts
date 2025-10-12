import {
  type SaveUploadMutationVariables,
  useSaveUploadMutation,
} from "@shared/api";
import { useRefetchUploadsYearCounts } from "./useUploads";

export function useSaveUpload(onSuccess: () => void) {
  const refetchYearCounts = useRefetchUploadsYearCounts();

  const [saveUploadMutation] = useSaveUploadMutation({
    onCompleted: () => {
      refetchYearCounts();
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
