import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export type OpenDirectoryRequest = {
  collection: string;
  media?: string;
};

export function useOpenDirectory({
  collection,
  media,
}: {
  collection: string;
  media?: string;
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
      collection,
      media,
    });
}
