// src/api/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

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

export const UPLOADS_WITH_THUMBNAILS = gql`
  query UploadsWithThumbnails($input: UploadsWithThumbnailsInput!) {
    uploadsWithThumbnails(input: $input) {
      ytChannelId
      ytVideoId
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

export const FETCH_DASHBOARD = gql`
  query FetchDashboard($fetchDashboardInput: FetchDashboardInput!) {
    fetchDashboard(fetchDashboardInput: $fetchDashboardInput) {
      channels {
        id
        createdAt
        title
        ytId
        src
        lastSyncedAt
        videoCount
        thumbnails
        saved
        defaults
        storyboard
        screenshotsCount
        playlist {
          id
          name
        }
      }
      total
    }
  }
`;

export const FETCH_VIDEOS_DASHBOARD = gql`
  query FetchVideosDashboard(
    $page: Float
    $sortOrder: String
    $screenshotMin: Float
    $screenshotMax: Float
  ) {
    fetchVideosDashboard(
      page: $page
      sortOrder: $sortOrder
      screenshotMin: $screenshotMin
      screenshotMax: $screenshotMax
    ) {
      videos {
        id
        ytId
        title
        src
        channelId
        channelTitle
        channelYtId
        screenshotCount
      }
      total
    }
  }
`;
