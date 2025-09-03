import { useUploadsWithStoryboardsLazyQuery } from "@shared/api";
import { setProcessingData } from "@shared/store";
import { useConvert } from "@shared/hooks";

export function useGetUploadsWithStoryboards() {
  const [getUploadsWithStoryboards, { data, loading, error }] =
    useUploadsWithStoryboardsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const convert = useConvert();

  const mutateAsync = async (ytChannelId: string) => {
    const { id } = await convert.mutateAsync({
      type: "youtube",
      value: ytChannelId,
      resource: "channel",
    });
    const result = await getUploadsWithStoryboards({
      variables: {
        input: { channelId: id },
      },
    });
    if (result.data?.uploadsWithStoryboards) {
      setProcessingData("storyboards", result.data.uploadsWithStoryboards);
    }
  };

  return {
    mutateAsync,
    data,
    loading,
    error,
  };
}
