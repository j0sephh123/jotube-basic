import { useQuery } from "@apollo/client";
import { GET_ALL_EPISODES } from "../api/episode.gql";
import type { GetAllEpisodesQuery } from "@shared/api/generated/graphql";

export const useGetAllEpisodes = () => {
  return useQuery<GetAllEpisodesQuery>(GET_ALL_EPISODES);
};
