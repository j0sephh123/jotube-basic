import { useQuery } from "@apollo/client";
import { GET_PLAYLISTS } from "@/entities/Playlist/api/playlist.gql";
import { GetPlaylistsQuery } from "@/generated/graphql";

export const useGetPlaylists = () => {
  const query = useQuery<GetPlaylistsQuery>(GET_PLAYLISTS);

  return {
    ...query,
    data: query.data?.playlists,
  };
};
