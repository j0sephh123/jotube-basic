import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useChannelsDashboardQuery } from "@/features/Dashboard/useChannelsDashboardQuery";

type DeleteUploadsRequest = {
  ytChannelId: string;
  ytVideoIds: string[];
};

type DeleteUploadsResponse = {
  success: boolean;
};

export function useDeleteUploads(onSuccess: () => void) {
  const { refetch } = useChannelsDashboardQuery();
  const { mutateAsync } = useMutation<
    DeleteUploadsResponse,
    unknown,
    DeleteUploadsRequest
  >({
    mutationFn: (body) =>
      nestFetcher({
        url: "/uploads-video/delete-uploads",
        method: "POST",
        body,
      }),
    onSuccess: () => {
      refetch();
      onSuccess();
    },
  });

  return mutateAsync;
}
