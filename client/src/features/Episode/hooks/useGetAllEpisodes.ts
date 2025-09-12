import {
  type GetAllEpisodesQuery,
  useGetAllEpisodesQuery,
} from "@shared/api/generated/graphql";

export type EpisodeResponse = GetAllEpisodesQuery["getAllEpisodes"][number];

export function useGetAllEpisodes() {
  return useGetAllEpisodesQuery();
}
