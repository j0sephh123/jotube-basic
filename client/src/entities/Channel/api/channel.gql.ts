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
  query GetChannelMetadata($channelMetadataInput: ChannelMetadataInput!) {
    channelMetadata(channelMetadataInput: $channelMetadataInput) {
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
  query GetChannelScreenshots($input: GetScreenshotsInput!) { 
    channelScreenshots(input: $input) {
      ytVideoId
      id
      second
      src
    }
  }
`;
