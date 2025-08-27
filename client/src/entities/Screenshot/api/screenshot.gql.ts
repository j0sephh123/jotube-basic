import { gql } from "@apollo/client";

export const GET_SHUFFLED_SCREENSHOTS = gql`
  query GetScreenshots($input: GetScreenshotsInput!) {
    getScreenshots(input: $input) {
      ytVideoId
      id
      second
      src
    }
  }
`;
