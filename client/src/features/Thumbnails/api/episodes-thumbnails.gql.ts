import { gql } from "@apollo/client";

export const GET_EPISODES_WITH_THUMBNAILS = gql`
  query GetEpisodesWithThumbnails($input: EpisodesWithThumbnailsInput!) {
    episodesWithThumbnails(input: $input) {
      tvIdentifier
      episodeIdentifier
    }
  }
`;
