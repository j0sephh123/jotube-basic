import {
  type GetThumbnailQueryVariables,
  useGetThumbnailQuery,
} from "@shared/api";

type Input = GetThumbnailQueryVariables["input"];

export function useGetThumbnail(input: Input) {
  const { data, loading, error } = useGetThumbnailQuery({
    variables: { input },
  });

  return {
    data: data?.getThumbnail,
    isLoading: loading,
    error,
  };
}

export function useRefetchGetThumbnail(input: Input) {
  const { refetch } = useGetThumbnailQuery({
    variables: { input },
  });

  return refetch;
}
