import { useCreateEpisodeMutation } from "@shared/api/generated/graphql";

export const useCreateEpisode = () => {
  const [mutate, result] = useCreateEpisodeMutation({
    refetchQueries: ["GetAllEpisodes", "GetEpisodesByTvId"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
