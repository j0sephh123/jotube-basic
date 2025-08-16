import { useGetThumbnailByVideoIdQuery } from "../../../generated/graphql";

export function useThumbnailByVideoId(ytVideoId: string) {
  const { data, loading, error } = useGetThumbnailByVideoIdQuery({
    variables: { ytVideoId },
    skip: ytVideoId.length === 0,
  });

  return {
    data: data?.thumbnailByVideoId,
    isLoading: loading,
    error,
  };
}

export function useRefetchThumbnailByVideoId(ytVideoId: string | undefined) {
  const { refetch } = useGetThumbnailByVideoIdQuery({
    variables: { ytVideoId: ytVideoId || "" },
    skip: !ytVideoId,
  });

  return refetch;
}
