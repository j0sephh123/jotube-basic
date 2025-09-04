import { useCreateTvMutation } from "@shared/api/generated/graphql";

export const useCreateTv = () => {
  const [mutate, result] = useCreateTvMutation({
    refetchQueries: ["GetAllTvs"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
