import {
  useUploadsWithStoryboardsLazyQuery,
  type UploadWithStoryboardResponse,
} from "@shared/api";
import { setProcessingData } from "@shared/store";

export function useGetUploadsWithStoryboards() {
  const [getUploadsWithStoryboards, { data, loading, error }] =
    useUploadsWithStoryboardsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const mutateAsync = async (channelIds: number[]) => {
    const result = await getUploadsWithStoryboards({
      variables: {
        input: { channelIds },
      },
    });
    if (result.data?.uploadsWithStoryboards) {
      setProcessingData(
        "storyboards",
        result.data.uploadsWithStoryboards as UploadWithStoryboardResponse[]
      );
    }
  };

  return {
    mutateAsync,
    data,
    loading,
    error,
  };
}
