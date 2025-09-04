import { useQuery } from "@apollo/client";
import { GET_EPISODES_BY_TV_ID } from "../api/episode.gql";
import type { GetEpisodesByTvIdQuery } from "@shared/api/generated/graphql";

export const useGetEpisodesByTvId = (tvId: number) => {
  return useQuery<GetEpisodesByTvIdQuery>(GET_EPISODES_BY_TV_ID, {
    variables: { tvId },
  });
};
