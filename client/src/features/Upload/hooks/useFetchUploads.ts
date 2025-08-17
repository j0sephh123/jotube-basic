import { useMutation, DefaultError } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

type UseFetchUploadsProps = {
  onSuccess: () => void;
  onError: ({ message }: { message: string }) => void;
};

export function useFetchUploads({ onError, onSuccess }: UseFetchUploadsProps) {
  const { mutateAsync, isPending, variables } = useMutation<
    unknown,
    DefaultError,
    { ytChannelId: string }
  >({
    mutationFn: (body: { ytChannelId: string }) =>
      nestFetcher<unknown>({
        url: "/uploads-video/fetch-uploads",
        method: "POST",
        body,
      }),
    onSuccess,
    onError: (error: DefaultError) => onError({ message: error.message }),
  });

  return {
    mutateAsync,
    isPending,
    variables,
  };
}
