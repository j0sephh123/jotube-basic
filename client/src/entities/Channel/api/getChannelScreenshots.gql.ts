import { gql } from "@apollo/client";

export const GET_CHANNEL_SCREENSHOTS = gql`
  query GetChannelScreenshots($input: GetScreenshotsInput!) {
    channelScreenshots(input: $input) {
      ytVideoId
      id
      second
      src
    }
  }
`;
