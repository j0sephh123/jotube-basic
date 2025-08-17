import { gql } from "@apollo/client";

export const STORYBOARDS = gql`
  query Storyboards($ytChannelId: String!) {
    storyboards(ytChannelId: $ytChannelId) {
      id
      ytId
      title
      src
      publishedAt
      createdAt
      updatedAt
      channelId
      nextPageToken
      duration
      artifact
      storyboard {
        id
        uploadsVideoId
        fragments
        url
        createdAt
        updatedAt
      }
    }
  }
`;
