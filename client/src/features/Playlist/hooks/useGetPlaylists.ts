import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher"; 
import { Playlist } from "../types";

export const useGetPlaylists = () => {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: () =>
      nestFetcher<Playlist[]>({
        url: "/playlists",
        method: "GET",
      }),
  });
};
