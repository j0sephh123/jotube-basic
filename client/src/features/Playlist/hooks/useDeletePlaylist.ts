import { useMutation, gql } from "@apollo/client";

// Local GraphQL mutation to avoid entities dependency
const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: Int!) {
    deletePlaylist(id: $id) {
      success
    }
  }
`;

export const useDeletePlaylist = () => {
  const [mutate, result] = useMutation(DELETE_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
