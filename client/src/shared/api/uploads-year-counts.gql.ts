import { gql } from "@apollo/client";

export const UPLOADS_YEAR_COUNTS = gql`
  query UploadsYearCounts($uploadsYearCountsInput: UploadsYearCountsInput!) {
    uploadsYearCounts(uploadsYearCountsInput: $uploadsYearCountsInput) {
      year
      count
    }
  }
`;
