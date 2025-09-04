import { useGetEpisodeDetailsQuery } from "@shared/api/generated/graphql";

export const useGetEpisodeDetails = (variables: {
  getEpisodeInput: { id: number };
}) => {
  const { data, loading, error } = useGetEpisodeDetailsQuery({
    variables,
  });

  return {
    data,
    loading,
    error,
  };
};
