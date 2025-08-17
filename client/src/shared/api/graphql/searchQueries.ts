import { gql } from "@apollo/client";

export const SEARCH_VIDEOS = gql`
  query SearchVideos($searchInput: SearchInput!) {
    searchVideos(searchInput: $searchInput) {
      title
      ytId
      src
      channelYtId
      type
    }
  }
`;

export const SEARCH_CHANNELS = gql`
  query SearchChannels($searchInput: SearchInput!) {
    searchChannels(searchInput: $searchInput) {
      title
      ytId
      src
      type
    }
  }
`;
