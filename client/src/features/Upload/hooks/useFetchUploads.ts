import { useFetchUploadsMutation } from "@/generated/graphql";

type UseFetchUploadsProps = {
  onSuccess: () => void;
  onError: ({ message }: { message: string }) => void;
};

export function useFetchUploads({ onError, onSuccess }: UseFetchUploadsProps) {
  const [fetchUploadsMutation, { loading, variables }] =
    useFetchUploadsMutation({
      onCompleted: (data: any) => {
        if (data.fetchUploads.success) {
          onSuccess();
        } else {
          onError({ message: data.fetchUploads.message });
        }
      },
      onError: (error: any) => onError({ message: error.message }),
    });

  return {
    mutateAsync: (body: { ytChannelId: string }) => {
      return fetchUploadsMutation({
        variables: {
          fetchUploadsInput: body,
        },
      });
    },
    isPending: loading,
    variables,
  };
}
