import { useUploadsWithStoryboardsLazyQuery } from "@shared/api";
import { setProcessingData } from "@shared/store";

export function useGetUploadsWithStoryboards() {
  const [getUploadsWithStoryboards, { data, loading, error }] =
    useUploadsWithStoryboardsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const mutateAsync = async (ytChannelId: string) => {
    const result = await getUploadsWithStoryboards({
      variables: {
        input: { ytChannelId },
      },
    });
    setProcessingData("storyboards", result.data?.uploadsWithStoryboards || []);
  };

  return {
    mutateAsync,
    data,
    loading,
    error,
  };
}
