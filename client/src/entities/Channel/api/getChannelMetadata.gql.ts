import { gql } from "@apollo/client";

export const GET_CHANNEL_METADATA = gql`
  query GetChannelMetadata($channelMetadataInput: ChannelMetadataInput!) {
    channelMetadata(channelMetadataInput: $channelMetadataInput) {
      id
      src
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