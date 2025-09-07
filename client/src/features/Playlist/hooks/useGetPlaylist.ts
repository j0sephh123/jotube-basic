import { useApolloClient } from "@apollo/client";
import { GET_PLAYLIST_DETAILS } from "@entities/Playlist";
import { useGetPlaylistDetailsQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";

export const useGetPlaylist = (idArgument: number | null) => {
  const id = useTypedParams("playlistId");

  const query = useGetPlaylistDetailsQuery({
    variables: { id: idArgument ? idArgument : parseInt(id!) },
    skip: !id && !idArgument,
    errorPolicy: "all",
  });

  return query;
};

export const useRefetchPlaylist = () => {
  const apolloClient = useApolloClient();
  return () => {
    apolloClient.refetchQueries({
      include: [GET_PLAYLIST_DETAILS],
    });
  };
};
