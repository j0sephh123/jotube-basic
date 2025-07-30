/* eslint-disable @typescript-eslint/no-explicit-any */
import nestFetcher from "@/shared/api/nestFetcher";
import { useMutation } from "@tanstack/react-query";

export default function useAddUploadsToQueue(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (
      body: {
        downloadOption?: number;
        ytChannelId?: string;
        ytVideoIds?: string[];
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
