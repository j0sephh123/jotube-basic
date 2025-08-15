import { useQuery, useQueryClient } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { Playlist } from "../types";
import { useParams } from "react-router-dom";

export const useGetPlaylist = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ["playlist", id],
    queryFn: () =>
      nestFetcher<Playlist>({
        url: `/playlists/${id}`,
        method: "GET",
      }),
    enabled: !!id,
  });
};

export const useRefetchPlaylist = (id: string) => {
  const queryClient = useQueryClient();
  return () => queryClient.refetchQueries({ queryKey: ["playlist", id] });
};
