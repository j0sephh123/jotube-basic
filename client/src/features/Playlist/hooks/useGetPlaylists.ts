import { useQuery } from "@apollo/client";
import { GET_PLAYLISTS } from "@/shared/api/graphql/queries";
import { GetPlaylistsQuery } from "@/generated/graphql";

export const useGetPlaylists = () => {
  const query = useQuery<GetPlaylistsQuery>(GET_PLAYLISTS);

  return {
    ...query,
    data: query.data?.playlists,
  };
};
