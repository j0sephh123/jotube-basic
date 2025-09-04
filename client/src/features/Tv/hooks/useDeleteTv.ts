import { useDeleteTvMutation } from "@shared/api/generated/graphql";

export const useDeleteTv = () => {
  const [mutate, result] = useDeleteTvMutation({
    refetchQueries: ["GetAllTvs"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
