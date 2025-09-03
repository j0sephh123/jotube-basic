import { useCleanShortUploadsMutation } from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
import { useState } from "react";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

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
        refetchChannelMetadata();
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
