import { useDeleteUploadsMutation } from "@shared/api";
import { useChannelsDashboardQuery } from "@features/Dashboard";

export function useDeleteUploads(onSuccess: () => void) {
  const { refetch } = useChannelsDashboardQuery();
  const [deleteUploadsMutation] = useDeleteUploadsMutation({
    onCompleted: () => {
      refetch();
      onSuccess();
    },
  });

  return (variables: { ytChannelId: string; ytVideoIds: string[] }) =>
    deleteUploadsMutation({ variables });
}
