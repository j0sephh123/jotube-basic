import { useMutation } from "@apollo/client";
import {
  DELETE_FILE_OR_DIRECTORY,
  type DeleteFileInput,
  type DeleteFileResponse,
} from "@shared/api";

export const useDeleteFileOrDirectory = () => {
  const [mutate, result] = useMutation<
    { deleteFileOrDirectory: DeleteFileResponse },
    { deleteFileInput: DeleteFileInput }
  >(DELETE_FILE_OR_DIRECTORY, {
    refetchQueries: ["GetVideoByYtId"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data?.deleteFileOrDirectory,
    error: result.error,
  };
};
