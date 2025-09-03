import { useApolloClient } from "@apollo/client";
import { GET_PLAYLIST_UPLOADS_LIST } from "@entities/Playlist";
import { useGetPlaylistUploadsListQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";

export function useGetPlaylistUploads() {
  const id = useTypedParams("playlistId");
  const uploadsType = useTypedParams("uploadsType");

  console.log({ id });

  return useGetPlaylistUploadsListQuery({
    variables: {
      playlistUploadsListInput: {
        playlistId: Number(id),
        uploadsType,
      },
    },
  });
}

export const useRefetchPlaylistUploads = () => {
  const apolloClient = useApolloClient();
  return () => {
    apolloClient.refetchQueries({
      include: [GET_PLAYLIST_UPLOADS_LIST],
    });
  };
};
