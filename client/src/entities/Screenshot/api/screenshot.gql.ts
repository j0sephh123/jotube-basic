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

export const GET_SCREENSHOTS_BY_VIDEO = gql`
  query GetScreenshotsByVideo($ytVideoId: String!) {
    screenshotsByVideo(ytVideoId: $ytVideoId) {
      id
      second
      ytChannelId
      ytVideoId
      src
    }
  }
`;
