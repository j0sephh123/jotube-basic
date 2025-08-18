import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/rest/nestFetcher";

export function useRemoveFromQueue() {
  const { mutateAsync } = useMutation<void, unknown, string[]>({
    mutationFn: (jobIds: string[]) =>
      nestFetcher<void>({
        url: "/queues/remove",
        method: "POST",
        body: { jobIds },
      }),
  });

  return mutateAsync;
}
