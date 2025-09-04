import { useGetTvQuery } from "@shared/api/generated/graphql";

export const useGetTv = (variables: { getTvInput: { id: number } }) => {
  const { data, loading, error } = useGetTvQuery({
    variables,
  });

  return {
    data,
    loading,
    error,
  };
};
