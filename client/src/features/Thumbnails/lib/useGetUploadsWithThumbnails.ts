import {
  type UploadsWithThumbnailsInput,
  useUploadsWithThumbnailsLazyQuery,
} from "@shared/api";

export function useGetUploadsWithThumbnails() {
  const [getUploadsWithThumbnails, { data, loading, error }] =
    useUploadsWithThumbnailsLazyQuery({
      fetchPolicy: "no-cache",
    });

  const mutateAsync = async (input: UploadsWithThumbnailsInput) => {
    const result = await getUploadsWithThumbnails({
      variables: {
        input,
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
