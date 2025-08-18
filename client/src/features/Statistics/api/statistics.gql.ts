import { gql } from "@apollo/client";

export const GET_STATISTICS_COUNTS = gql`
  query GetStatisticsCounts {
    statisticsCounts {
      totalScreenshots
      totalThumbnails
      totalSaved
    }
  }
`;
