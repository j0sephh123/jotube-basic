import { useApolloClient } from "@apollo/client";
import {
  GetPlaylistUploadsListDocument,
  useGetPlaylistUploadsListQuery,
} from "@shared/api";
import { useTypedParams } from "@shared/hooks";

export function useGetPlaylistUploads() {
  const id = useTypedParams("playlistId");
  const uploadsType = useTypedParams("uploadsType");

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
      include: [GetPlaylistUploadsListDocument],
    });
  };
};
