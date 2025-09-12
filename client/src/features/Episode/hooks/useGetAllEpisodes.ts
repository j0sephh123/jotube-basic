import {
  type GetAllEpisodesQuery,
  useGetAllEpisodesQuery,
  type GetAllEpisodesInput,
} from "@shared/api/generated/graphql";

export type EpisodeResponse = GetAllEpisodesQuery["getAllEpisodes"][number];

export function useGetAllEpisodes(getAllEpisodesInput: GetAllEpisodesInput) {
  return useGetAllEpisodesQuery({
    variables: { getAllEpisodesInput },
  });
}
