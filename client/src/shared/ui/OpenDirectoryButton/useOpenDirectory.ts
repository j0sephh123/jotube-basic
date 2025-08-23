import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export type OpenDirectoryRequest = {
  ytChannelId: string;
  ytVideoId?: string;
};

export function useOpenDirectory({
  ytChannelId,
  ytVideoId,
}: {
  ytChannelId: string;
  ytVideoId?: string;
}) {
  const { mutateAsync } = useMutation<unknown, unknown, OpenDirectoryRequest>({
    mutationFn: (body: OpenDirectoryRequest) =>
      nestFetcher({
        url: "/open-directory",
        method: "POST",
        body,
      }),
  });

  return () =>
    mutateAsync({
      ytChannelId,
      ytVideoId,
    });
}
