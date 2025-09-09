import { gql } from "@apollo/client";

export const GET_PROCESSING_READY_UPLOADS = gql`
  query GetProcessingReadyUploads {
    getProcessingReadyUploads {
      count
    }
  }
`;
