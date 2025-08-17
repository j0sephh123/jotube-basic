import { useQuery } from "@apollo/client";
import { GET_PLAYLIST_DETAILS } from "@/shared/api/graphql/playlistQueries";
import { GetPlaylistDetailsQuery } from "@/generated/graphql";
import { useParams } from "react-router-dom";

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
