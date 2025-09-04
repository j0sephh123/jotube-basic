import { useGetEpisodeQuery } from "@shared/api/generated/graphql";

export const useGetEpisode = (variables: {
  getEpisodeInput: { id: number };
}) => {
  const { data, loading, error } = useGetEpisodeQuery({
    variables,
  });

  return {
    data,
    loading,
    error,
  };
};
