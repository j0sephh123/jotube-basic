import { useGetAllTvsQuery } from "@shared/api/generated/graphql";

export const useGetAllTvs = () => {
  const { data, loading, error } = useGetAllTvsQuery();

  return {
    data: data?.getAllTvs,
    loading,
    error,
  };
};
