import { gql } from "@apollo/client";

export const GET_PROCESSING_PHASES = gql`
  query GetProcessingPhases {
    processingPhases {
      id
      uploadsVideoId
      phase
      createdAt
      endedAt
      uploadsVideo {
        id
        ytId
        title
        channel {
          id
          title
          ytId
        }
      }
    }
  }
`;
