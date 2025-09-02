import { gql } from "@apollo/client";

export const GET_PROCESSING_PHASES = gql`
  query GetProcessingPhases($variant: String) {
    processingPhases(variant: $variant) {
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
