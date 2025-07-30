import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export function useFinishProcessingUpload(onSuccess?: () => void) {
  const { mutateAsync } = useMutation<unknown, unknown, object>({
    mutationFn: (body: object): Promise<unknown> =>
      nestFetcher({
        url: "/uploads-video/finish-processing-upload",
        method: "POST",
        body,
      }),
    onSuccess: onSuccess ? onSuccess : undefined,
  });

  return mutateAsync;
}
