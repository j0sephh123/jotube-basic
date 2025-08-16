import { useUploadsWithThumbnailsLazyQuery } from "../../../generated/graphql";

export function useGetUploadsWithThumbnails() {
  const [getUploadsWithThumbnails, { data, loading, error }] =
    useUploadsWithThumbnailsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const mutateAsync = (channelIds: number[]) => {
    return getUploadsWithThumbnails({
      variables: {
        input: { channelIds },
      },
    }).then((result) => result.data?.uploadsWithThumbnails || []);
  };

  return {
    mutateAsync,
    data,
    loading,
    error,
  };
}
