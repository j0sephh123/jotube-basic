import { useMutation, DefaultError } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useRefetchChannelUploads } from "./useUploadsList";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";

type Body = {
  ytVideoId: string;
};
type Response = unknown

export function useCreateStoryboard(ytChannelId: string) {
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);
  const refetchChannelMetadata = useRefetchChannelMetadata();

  const { mutateAsync, isPending, variables } = useMutation<
    Response,
    DefaultError,
    Body
  >({
    mutationFn: (body: Body) => {
      return nestFetcher<Response>({
        url: "/uploads-video/create-storyboard",
        method: "POST",
        body,
      });
    },
    onSuccess: () => {
      refetchChannelUploads();
      refetchChannelMetadata(ytChannelId);
    },
    onError: (error: DefaultError) => {
      console.error(error);
    },
  });

  return {
    mutateAsync,
    isPending,
    variables,
  };
}
