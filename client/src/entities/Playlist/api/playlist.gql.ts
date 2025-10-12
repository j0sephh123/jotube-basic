import { gql } from "@apollo/client";

export const CHANNEL_FRAGMENT = gql`
  fragment ChannelFragment on PlaylistChannelResponse {
    id
    ytId
  }
`;

export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($createPlaylistInput: CreatePlaylistInput!) {
    createPlaylist(createPlaylistInput: $createPlaylistInput) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    playlists {
      id
      name
      createdAt
      updatedAt
      channels {
        ...ChannelFragment
        title
      }
    }
  }
  ${CHANNEL_FRAGMENT}
`;

export const GET_PLAYLIST_DETAILS = gql`
  query GetPlaylistDetails($id: Int!) {
    playlistDetails(id: $id) {
      id
      name
      createdAt
      updatedAt
      channels {
        id
        title
        ytId
        src
        videoCount
        totalVideos
        saved
        screenshotCount
        thumbnailCount
        storyboardCount
        lastSyncedAt
        createdAt
        fetchedUntilEnd
        featuredScreenshots {
          id
          second
          ytVideoId
          src
        }
      }
    }
  }
`;

export const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist(
    $id: Int!
    $updatePlaylistInput: UpdatePlaylistInput!
  ) {
    updatePlaylist(id: $id, updatePlaylistInput: $updatePlaylistInput) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: Int!) {
    deletePlaylist(id: $id) {
      success
    }
  }
`;

export const UPDATE_CHANNEL_PLAYLIST = gql`
  mutation UpdateChannelPlaylist(
    $updateChannelPlaylistInput: UpdateChannelPlaylistInput!
  ) {
    updateChannelPlaylist(
      updateChannelPlaylistInput: $updateChannelPlaylistInput
    ) {
      id
      title
      ytId
      src
      videoCount
      playlistId
    }
  }
`;

export const GET_PLAYLIST_UPLOADS_LIST = gql`
  query GetPlaylistUploadsList(
    $playlistUploadsListInput: PlaylistUploadsListInput!
  ) {
    playlistUploadsList(playlistUploadsListInput: $playlistUploadsListInput) {
      id
      ytId
      title
      publishedAt
      channelTitle
      ytChannelId
      src
    }
  }
`;
