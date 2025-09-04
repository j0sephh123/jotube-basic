import { useUpdateEpisodeMutation } from "@shared/api/generated/graphql";

export const useUpdateEpisode = () => {
  const [mutate, result] = useUpdateEpisodeMutation({
    refetchQueries: ["GetAllEpisodes", "GetEpisodesByTvId"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
