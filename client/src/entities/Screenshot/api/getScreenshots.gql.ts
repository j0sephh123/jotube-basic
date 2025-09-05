import { gql } from "@apollo/client";

export const GET_SCREENSHOTS = gql`
  query GetScreenshots($input: GetScreenshotsInput!) {
    getScreenshots(input: $input) {
      ytVideoId
      id
      second
      src
    }
  }
`;
