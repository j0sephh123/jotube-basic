import { nestFetcher } from "@shared/api";
import { useMutation } from "@tanstack/react-query";

export default function useDownload(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (
      body: {
        channelId: number;
        ytVideoIds: string[];
      }[]
    ) =>
      nestFetcher({
        url: "/queues/add-uploads",
        method: "POST",
        body,
      }),
    onSuccess,
  });
}
