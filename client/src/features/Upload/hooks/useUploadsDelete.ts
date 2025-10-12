import { type DeleteUploadsInput, useDeleteUploadsMutation } from "@shared/api";
import { useChannelsDashboardQuery } from "@features/Dashboard";
import { useRefetchUploadsYearCounts } from "./useUploads";

export function useDeleteUploads(onSuccess: () => void) {
  const { refetch } = useChannelsDashboardQuery();
  const refetchYearCounts = useRefetchUploadsYearCounts();

  const [deleteUploadsMutation] = useDeleteUploadsMutation({
    onCompleted: () => {
      refetch();
      refetchYearCounts();
      onSuccess();
    },
  });

  return (deleteUploadsInput: DeleteUploadsInput) =>
    deleteUploadsMutation({
      variables: {
        deleteUploadsInput,
      },
    });
}
