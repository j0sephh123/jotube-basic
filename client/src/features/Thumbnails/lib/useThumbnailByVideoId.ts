import { useGetThumbnailByVideoIdQuery } from "@shared/api";

export function useThumbnailByVideoId(videoId: number) {
  const { data, loading, error } = useGetThumbnailByVideoIdQuery({
    variables: { videoId },
  });

  return {
    data: data?.thumbnailByVideoId,
    isLoading: loading,
    error,
  };
}

export function useRefetchThumbnailByVideoId(videoId: number) {
  const { refetch } = useGetThumbnailByVideoIdQuery({
    variables: { videoId },
  });

  return refetch;
}
