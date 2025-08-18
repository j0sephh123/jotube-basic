/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  DefaultError,
  useQueryClient,
} from "@tanstack/react-query";
import nestFetcher from "@shared/api/nestFetcher";
import { useRefetchChannelUploads } from "@features/Upload/hooks/useUploadsList";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { useRefetchQueue } from "@shared/hooks/useQueue";

type Body = {
  ytVideoId: string;
};
type Response = unknown;

export function useCreateStoryboard(ytChannelId: string) {
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchQueue = useRefetchQueue();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, variables } = useMutation<
    Response,
    DefaultError,
    Body
  >({
    mutationFn: (body: Body) => {
      return nestFetcher<Response>({
        url: "/queues/add-storyboard",
        method: "POST",
        body: { data: body },
      });
    },
    onSuccess: (_data, variables) => {
      ["asc", "desc"].forEach((sort) => {
        queryClient.setQueryData(
          ["useUploadsList", ytChannelId, sort],
          (prev: any) => {
            if (!prev || !prev.uploads) return prev;
            return {
              ...prev,
              uploads: prev.uploads.filter(
                (u: any) => u.ytId !== variables.ytVideoId
              ),
            };
          }
        );
      });
      refetchChannelUploads();
      refetchChannelMetadata(ytChannelId);
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
