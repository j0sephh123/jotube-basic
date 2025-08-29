import { useQuery, gql, useApolloClient } from "@apollo/client";
import type { GetPlaylistsQuery } from "@shared/api";

// Local GraphQL query to avoid entities dependency
const GET_PLAYLISTS = gql`
  query GetPlaylists {
    playlists {
      id
      name
      createdAt
      updatedAt
      channels {
        id
        ytId
        title
      }
    }
  }
`;

export const useGetPlaylists = () => {
  const query = useQuery<GetPlaylistsQuery>(GET_PLAYLISTS);

  return {
    ...query,
    data: query.data?.playlists,
  };
};

export function useRefetchPlaylists() {
  const apolloClient = useApolloClient();
  return () => apolloClient.refetchQueries({ include: ["GetPlaylists"] });  
};