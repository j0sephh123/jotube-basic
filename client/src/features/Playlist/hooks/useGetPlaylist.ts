import { useQuery, gql, useApolloClient } from "@apollo/client";
import type { GetPlaylistDetailsQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";

// Local GraphQL query to avoid entities dependency
const GET_PLAYLIST_DETAILS = gql`
  query GetPlaylistDetails($id: Int!) {
    playlistDetails(id: $id) {
      id
      name
      createdAt
      updatedAt
      channels {
        id
        title
        ytId
        src
        videoCount
        savedCount
        screenshotCount
        thumbnailCount
        lastSyncedAt
        featuredScreenshots {
          id
          second
          ytVideoId
          src
        }
      }
    }
  }
`;

export const useGetPlaylist = (idArgument: number | null) => {
  const id = useTypedParams("playlistId");

  return useQuery<GetPlaylistDetailsQuery>(GET_PLAYLIST_DETAILS, {
    variables: { id: idArgument ? idArgument : parseInt(id!) },
    skip: !id && !idArgument,
    errorPolicy: "all",
  });
};

export const useRefetchPlaylist = () => {
  const apolloClient = useApolloClient();
  return () => {
    apolloClient.refetchQueries({
      include: [GET_PLAYLIST_DETAILS],
    });
  };
};
