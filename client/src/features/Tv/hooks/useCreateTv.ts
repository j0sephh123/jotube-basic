import { useMutation, gql } from "@apollo/client";

const CREATE_TV = gql`
  mutation CreateTv($createTvInput: CreateTvInput!) {
    createTv(createTvInput: $createTvInput) {
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

export const useCreateTv = () => {
  const [mutate, result] = useMutation(CREATE_TV, {
    refetchQueries: ["GetAllTvs"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
