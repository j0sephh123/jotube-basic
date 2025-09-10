import { gql } from "@apollo/client";

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
        featuredScreenshots {
          src
          id
          second
          ytVideoId
        }
      }
      total
    }
  }
`;

export const FETCH_VIDEOS_DASHBOARD = gql`
  query FetchVideosDashboard(
    $sortOrder: String
    $screenshotMin: Float
    $screenshotMax: Float
  ) {
    fetchVideosDashboard(
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
        featuredScreenshots {
          src
          id
          second
          ytVideoId
        }
      }
      total
    }
  }
`;
