import { gql } from "@apollo/client";

export const GET_ALL_EPISODES = gql`
  query GetAllEpisodes {
    getAllEpisodes {
      id
      identifier
      title
      artifact
      createdAt
      tvId
      tvTitle
    }
  }
`;

export const GET_EPISODES_BY_TV_ID = gql`
  query GetEpisodesByTvId($tvId: Float!) {
    getEpisodesByTvId(tvId: $tvId) {
      id
      identifier
      title
      artifact
      publishedAt
      createdAt
      updatedAt
      tvId
    }
  }
`;

export const GET_EPISODE = gql`
  query GetEpisode($getEpisodeInput: GetEpisodeInput!) {
    getEpisode(getEpisodeInput: $getEpisodeInput) {
      id
      identifier
      title
      artifact
      publishedAt
      createdAt
      updatedAt
      tvId
      tv {
        id
        identifier
        title
      }
    }
  }
`;

export const GET_EPISODE_DETAILS = gql`
  query GetEpisodeDetails($getEpisodeInput: GetEpisodeInput!) {
    getEpisodeDetails(getEpisodeInput: $getEpisodeInput) {
      id
      identifier
      title
      artifact
      publishedAt
      createdAt
      updatedAt
      tvId
      tv {
        id
        identifier
        title
      }
    }
  }
`;

export const CREATE_EPISODE = gql`
  mutation CreateEpisode($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(createEpisodeInput: $createEpisodeInput) {
      episode {
        id
        identifier
        title
        artifact
        publishedAt
        createdAt
        updatedAt
        tvId
      }
      message
    }
  }
`;

export const UPDATE_EPISODE = gql`
  mutation UpdateEpisode(
    $id: Float!
    $updateEpisodeInput: UpdateEpisodeInput!
  ) {
    updateEpisode(id: $id, updateEpisodeInput: $updateEpisodeInput) {
      episode {
        id
        identifier
        title
        artifact
        publishedAt
        createdAt
        updatedAt
        tvId
      }
      message
    }
  }
`;

export const DELETE_EPISODE = gql`
  mutation DeleteEpisode($deleteEpisodeInput: DeleteEpisodeInput!) {
    deleteEpisode(deleteEpisodeInput: $deleteEpisodeInput) {
      success
      message
    }
  }
`;
