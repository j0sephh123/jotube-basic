/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultError } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
import { useRefetchQueue } from "@shared/hooks";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

type Body = {
  ytVideoId: string;
};
type Response = unknown;

export function useCreateStoryboard(ytChannelId: string) {
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchQueue = useRefetchQueue();

  const { mutateAsync, isPending, variables } = useMutation<
    Response,
    DefaultError,
    Body
  >({
    mutationFn: (body: Body) =>
      nestFetcher<Response>({
        url: "/queues/add-storyboard",
        method: "POST",
        body: { data: body },
      }),
    onSuccess: (_data) => {
      refetchChannelUploads();
      refetchChannelMetadata();
      refetchQueue();
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
