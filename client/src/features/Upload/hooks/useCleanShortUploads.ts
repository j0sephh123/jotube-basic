import {
  type CleanShortUploadsInput,
  useCleanShortUploadsMutation,
} from "@shared/api";
import { useRefetchChannelUploads } from "@features/Upload";
import { useState } from "react";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

export function useCleanShortUploads() {
  const [currentVariables, setCurrentVariables] = useState<{
    channelId: number;
  } | null>(null);
  const refetchChannelUploads = useRefetchChannelUploads();
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

  const mutateAsync = (body: CleanShortUploadsInput) => {
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
