import { gql } from "@apollo/client";

export const GET_THUMBNAIL_BY_VIDEO_ID = gql`
  query GetThumbnailByVideoId($ytVideoId: String!) {
    thumbnailByVideoId(ytVideoId: $ytVideoId) {
      createdAt
      id
      perRow
      updatedAt
      uploadsVideoId
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
    }
  }
`;
