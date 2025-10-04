/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultError } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
import { useRefetchQueue } from "@shared/hooks";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

export type UseCreateStoryboardBody = {
  ytVideoIds: string[];
};

export function useCreateStoryboard() {
  const refetchChannelUploads = useRefetchChannelUploads();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchQueue = useRefetchQueue();

  const { mutateAsync, isPending, variables } = useMutation<
    Response,
    DefaultError,
    UseCreateStoryboardBody
  >({
    mutationFn: (body) =>
      nestFetcher({
        url: "/queues/add-storyboards",
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
