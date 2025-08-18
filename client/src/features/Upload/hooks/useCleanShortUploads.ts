import { useCleanShortUploadsMutation } from "@/shared/api/generated/graphql";
import { useRefetchChannelUploads } from "@features/Upload/hooks/useUploadsList";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { useState } from "react";

export function useCleanShortUploads(ytChannelId: string) {
  const [currentVariables, setCurrentVariables] = useState<{
    ytChannelId: string;
  } | null>(null);
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);
  const refetchChannelMetadata = useRefetchChannelMetadata();

  const [cleanShortUploadsMutation, { loading }] = useCleanShortUploadsMutation(
    {
      onCompleted: () => {
        refetchChannelUploads();
        refetchChannelMetadata(ytChannelId);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const mutateAsync = (body: { ytChannelId: string }) => {
    setCurrentVariables(body);
    return cleanShortUploadsMutation({
      variables: {
        cleanShortUploadsInput: body,
      },
    });
  };

  return {
    mutateAsync,
    isPending: loading,
    variables: currentVariables,
  };
}
