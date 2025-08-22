import { useFetchUploadsMutation } from "@shared/api";
import { useState } from "react";

type UseFetchUploadsProps = {
  onSuccess: () => void;
  onError: ({ message }: { message: string }) => void;
};

export function useFetchUploads({ onError, onSuccess }: UseFetchUploadsProps) {
  const [currentVariables, setCurrentVariables] = useState<{
    ytChannelId: string;
  } | null>(null);

  const [fetchUploadsMutation, { loading }] = useFetchUploadsMutation({
    onCompleted: () => {
      onSuccess();
    },
    onError: (error) => {
      onError({ message: error.message });
    },
  });

  const mutateAsync = (body: { ytChannelId: string }) => {
    setCurrentVariables(body);
    return fetchUploadsMutation({
      variables: {
        fetchUploadsInput: body,
      },
    });
  };

  return {
    mutateAsync,
    isPending: loading,
    variables: currentVariables,
  };
}
