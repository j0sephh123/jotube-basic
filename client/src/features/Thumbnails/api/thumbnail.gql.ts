import { gql } from "@apollo/client";

export const GET_THUMBNAIL = gql`
  query GetThumbnail($input: GetThumbnailInput!) {
    getThumbnail(input: $input) {
      createdAt
      id
      perRow
      updatedAt
      uploadsVideoId
      episodeId
      totalSeconds
      thumbnailsCount
      uploadsVideo {
        ytId
        channel {
          id
          ytId
          title
        }
      }
      episode {
        identifier
        tv {
          identifier
        }
      }
    }
  }
`;
