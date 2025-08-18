import { useDeleteUploadsMutation } from "@/generated/graphql";
import { useChannelsDashboardQuery } from "@widgets/Dashboard/api/useChannelsDashboardQuery";

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
