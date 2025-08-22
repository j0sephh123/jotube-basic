import nestFetcher from "@shared/api/rest/nestFetcher";
import { useMutation } from "@tanstack/react-query";

export default function useDownload(onSuccess?: () => void) {
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
