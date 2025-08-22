import { useQuery, gql } from "@apollo/client";
import type { GetPlaylistDetailsQuery } from "@shared/api";
import { useParams } from "react-router-dom";

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
      }
    }
  }
`;

export const useGetPlaylist = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery<GetPlaylistDetailsQuery>(GET_PLAYLIST_DETAILS, {
    variables: { id: parseInt(id!) },
    skip: !id,
    errorPolicy: "all",
  });
};

export const useRefetchPlaylist = () => {
  return () => {
    // This will be handled by the GraphQL query refetch
  };
};
