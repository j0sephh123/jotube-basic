import { gql } from "@apollo/client";

export const GET_SLIDES = gql`
  query GetSlides($input: GetSlidesInput!) {
    getSlides(input: $input) {
      ytVideoId
      id
      second
      src
      isFav
    }
  }
`;

export const GET_SCREENSHOTS = gql`
  query GetScreenshots {
    screenshots {
      month
      count
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
      isFav
      src
    }
  }
`;
