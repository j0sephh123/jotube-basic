import { useApolloClient } from "@apollo/client";
import { GET_PLAYLIST_UPLOADS_LIST } from "@entities/Playlist";
import { useGetPlaylistUploadsListQuery } from "@shared/api";
import { useParams } from "react-router-dom";

export function useGetPlaylistUploads() {
  const { id, uploadsType } = useParams<{
    id: string;
    uploadsType: "default" | "saved";
  }>();
  return useGetPlaylistUploadsListQuery({
    variables: {
      playlistUploadsListInput: {
        playlistId: Number(id),
        uploadsType: uploadsType as "default" | "saved",
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
