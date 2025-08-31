import { useGetThumbnailByVideoIdQuery } from "@shared/api";

export function useThumbnailByVideoId(ytVideoId: string | undefined) {
  const { data, loading, error } = useGetThumbnailByVideoIdQuery({
    variables: { ytVideoId: ytVideoId ?? "" },
    skip: !ytVideoId,
  });

  return {
    data: data?.thumbnailByVideoId,
    isLoading: loading,
    error,
  };
}

export function useRefetchThumbnailByVideoId(ytVideoId: string | undefined) {
  const { refetch } = useGetThumbnailByVideoIdQuery({
    variables: { ytVideoId: ytVideoId ?? "" },
    skip: !ytVideoId,
  });

  return refetch;
}
