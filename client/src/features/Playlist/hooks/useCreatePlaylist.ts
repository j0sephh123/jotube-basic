import { useMutation, gql } from "@apollo/client";

// Local GraphQL mutation to avoid entities dependency
const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($createPlaylistInput: CreatePlaylistInput!) {
    createPlaylist(createPlaylistInput: $createPlaylistInput) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const useCreatePlaylist = () => {
  const [mutate, result] = useMutation(CREATE_PLAYLIST, {
    refetchQueries: ["GetPlaylists"],
  });

  return {
    mutate,
    isPending: result.loading,
    data: result.data,
    error: result.error,
  };
};
