import { useUploadsWithThumbnailsLazyQuery } from "@shared/api";

export function useGetUploadsWithThumbnails() {
  const [getUploadsWithThumbnails, { data, loading, error }] =
    useUploadsWithThumbnailsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const mutateAsync = async (channelIds: number[]) => {
    const result = await getUploadsWithThumbnails({
      variables: {
        input: { channelIds },
      },
    });
    return result.data?.uploadsWithThumbnails || [];
  };

  return {
    mutateAsync,
    data,
    loading,
    error,
  };
}
