import { useTypedChannelYtId } from "@features/Dashboard";
import {
  useUploadsWithStoryboardsLazyQuery,
  useUploadsWithStoryboardsQuery,
} from "@shared/api";
import { setProcessingData } from "@shared/store";

export function useUploadsWithStoryboard() {
  const ytChannelId = useTypedChannelYtId();

  const { data, loading, error, refetch } = useUploadsWithStoryboardsQuery({
    variables: { input: { ytChannelId } },
    skip: !ytChannelId,
  });

  return {
    data: data?.uploadsWithStoryboards,
    isLoading: loading,
    error,
    refetch,
  };
}

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
