import { useMutation, gql } from "@apollo/client";

const UPDATE_TV = gql`
  mutation UpdateTv($id: Float!, $updateTvInput: UpdateTvInput!) {
    updateTv(id: $id, updateTvInput: $updateTvInput) {
      tv {
        id
        identifier
        title
        duration
        createdAt
        updatedAt
      }
      message
    }
  }
`;

export const useUpdateTv = () => {
  const [mutate, result] = useMutation(UPDATE_TV, {
    refetchQueries: ["GetAllTvs"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
