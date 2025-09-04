import { useDeleteEpisodeMutation } from "@shared/api/generated/graphql";

export const useDeleteEpisode = () => {
  const [mutate, result] = useDeleteEpisodeMutation({
    refetchQueries: ["GetAllEpisodes", "GetEpisodesByTvId"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
