import { gql } from "@apollo/client";

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
      title
      ytId
      storyboard {
        fragments
        url
      }
      channel {
        id
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
      channelTitle
      channelId
      videoId
    }
  }
`;

export const DELETE_UPLOADS = gql`
  mutation DeleteUploads($deleteUploadsInput: DeleteUploadsInput!) {
    deleteUploads(deleteUploadsInput: $deleteUploadsInput) {
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

export const GET_VIDEO_BY_YT_ID = gql`
  query GetVideoByYtId($getVideoByYtIdInput: GetVideoByYtIdInput!) {
    getVideoByYtId(getVideoByYtIdInput: $getVideoByYtIdInput) {
      id
      createdAt
      updatedAt
      publishedAt
      title
      ytId
      src
      artifact
      channelTitle
      filesWithSize {
        name
        sizeMB
      }
      directoriesWithSize {
        name
        sizeMB
      }
      totalSizeMB
      screenshots
    }
  }
`;
