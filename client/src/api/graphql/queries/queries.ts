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

export const SAVE_UPLOAD = gql`
  mutation SaveUpload($saveUploadInput: SaveUploadInput!) {
    saveUpload(saveUploadInput: $saveUploadInput) {
      success
      message
    }
  }
`;

export const FETCH_UPLOADS = gql`
  mutation FetchUploads($fetchUploadsInput: FetchUploadsInput!) {
    fetchUploads(fetchUploadsInput: $fetchUploadsInput) {
      success
      message
      uploadIds
    }
  }
`;

export const UPLOADS_WITH_STORYBOARDS = gql`
  query UploadsWithStoryboards($input: StoryboardQueryInput!) {
    uploadsWithStoryboards(input: $input) {
      id
      ytId
      title
      src
      publishedAt
      createdAt
      updatedAt
      channelId
      nextPageToken
      duration
      artifact
      storyboard {
        id
        uploadsVideoId
        fragments
        url
        createdAt
        updatedAt
      }
    }
  }
`;

export const SYNC_UPLOADS = gql`
  mutation SyncUploads($syncUploadsInput: SyncUploadsInput!) {
    syncUploads(syncUploadsInput: $syncUploadsInput) {
      count
    }
  }
`;

export const CLEAN_SHORT_UPLOADS = gql`
  mutation CleanShortUploads($cleanShortUploadsInput: CleanShortUploadsInput!) {
    cleanShortUploads(cleanShortUploadsInput: $cleanShortUploadsInput) {
      deletedCount
    }
  }
`;

export const SAVED_UPLOADS = gql`
  query SavedUploads($savedUploadsInput: SavedUploadsInput!) {
    savedUploads(savedUploadsInput: $savedUploadsInput) {
      ytChannelId
      channel {
        id
        title
        src
        ytId
        uploads {
          createdAt
          ytId
          id
          duration
          publishedAt
          src
          title
          artifact
        }
        totalUploads
      }
      uploads {
        createdAt
        ytId
        id
        duration
        publishedAt
        src
        title
        artifact
      }
      totalUploads
    }
  }
`;

export const UPLOADS_LIST = gql`
  query UploadsList($uploadsListInput: UploadsListInput!) {
    uploadsList(uploadsListInput: $uploadsListInput) {
      id
      createdAt
      updatedAt
      title
      ytId
      src
      videoCount
      fetchStartVideoId
      fetchedUntilEnd
      lastSyncedAt
      uploads {
        artifact
        channelId
        createdAt
        duration
        id
        nextPageToken
        publishedAt
        src
        title
        updatedAt
        ytId
      }
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

export const GET_STATISTICS_COUNTS = gql`
  query GetStatisticsCounts {
    statisticsCounts {
      totalScreenshots
      totalThumbnails
      totalSaved
    }
  }
`;

export const GET_THUMBNAIL_BY_VIDEO_ID = gql`
  query GetThumbnailByVideoId($ytVideoId: String!) {
    thumbnailByVideoId(ytVideoId: $ytVideoId) {
      createdAt
      id
      perRow
      updatedAt
      uploadsVideoId
      totalSeconds
      thumbnailsCount
      uploadsVideo {
        ytId
        channel {
          id
          ytId
          title
        }
      }
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
      isFav
    }
  }
`;

export const DELETE_UPLOADS = gql`
  mutation DeleteUploads($ytChannelId: String!, $ytVideoIds: [String!]!) {
    deleteUploads(ytChannelId: $ytChannelId, ytVideoIds: $ytVideoIds) {
      success
    }
  }
`;

export const FINISH_PROCESSING_UPLOAD = gql`
  mutation FinishProcessingUpload(
    $ytChannelId: String!
    $ytVideoId: String!
    $savedSeconds: [Float!]!
  ) {
    finishProcessingUpload(
      ytChannelId: $ytChannelId
      ytVideoId: $ytVideoId
      savedSeconds: $savedSeconds
    ) {
      id
      ytId
      artifact
    }
  }
`;
