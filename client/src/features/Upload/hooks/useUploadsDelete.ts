import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useDashboardQuery } from "@/features/Dashboard/useDashboardQuery";

type DeleteUploadsRequest = {
  ytChannelId: string;
  ytVideoIds: string[];
};

type DeleteUploadsResponse = {
  success: boolean;
};

export function useDeleteUploads(onSuccess: () => void) {
  const { refetch } = useDashboardQuery();
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
