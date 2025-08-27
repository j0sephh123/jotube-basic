import { gql } from "@apollo/client";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($createChannelInput: CreateChannelInput!) {
    createChannel(createChannelInput: $createChannelInput) {
      message
      ytChannelId
    }
  }
`;

export const DELETE_CHANNEL = gql`
  mutation DeleteChannel($id: Float!) {
    deleteChannel(id: $id) {
      success
      message
    }
  }
`;

export const GET_CHANNEL_FOR_PLAYLIST = gql`
  query GetChannelForPlaylist($ytChannelId: String!) {
    channelForPlaylist(ytChannelId: $ytChannelId) {
      id
      title
    }
  }
`;

export const GET_CHANNEL_METADATA = gql`
  query GetChannelMetadata($ytChannelId: String!) {
    channelMetadata(ytChannelId: $ytChannelId) {
      id
      title
      fetchedUntilEnd
      videoCount
      lastSyncedAt
      playlist {
        id
        name
      }
      videoArtifactsCount
      savedArtifactsCount
      thumbnailArtifactsCount
      screenshotArtifactsCount
      storyboardArtifactsCount
    }
  }
`;

export const GET_CHANNEL_SCREENSHOTS = gql`
  query GetChannelScreenshots($ytChannelId: String!) {
    channelScreenshots(ytChannelId: $ytChannelId) {
      ytVideoId
      id
      second
      src
    }
  }
`;
