import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { Playlist } from "../types";

export const useGetPlaylist = (id: number) => {
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
