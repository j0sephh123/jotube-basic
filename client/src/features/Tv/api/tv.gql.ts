import { gql } from "@apollo/client";

export const GET_ALL_TVS = gql`
  query GetAllTvs {
    getAllTvs {
      id
      identifier
      title
      duration
      createdAt
      updatedAt
    }
  }
`;

export const GET_TV = gql`
  query GetTv($getTvInput: GetTvInput!) {
    getTv(getTvInput: $getTvInput) {
      id
      identifier
      title
      duration
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TV = gql`
  mutation CreateTv($createTvInput: CreateTvInput!) {
    createTv(createTvInput: $createTvInput) {
      tv {
        id
        identifier
        title
        duration
        createdAt
        updatedAt
      }
      message
    }
  }
`;

export const UPDATE_TV = gql`
  mutation UpdateTv($id: Float!, $updateTvInput: UpdateTvInput!) {
    updateTv(id: $id, updateTvInput: $updateTvInput) {
      tv {
        id
        identifier
        title
        duration
        createdAt
        updatedAt
      }
      message
    }
  }
`;

export const DELETE_TV = gql`
  mutation DeleteTv($deleteTvInput: DeleteTvInput!) {
    deleteTv(deleteTvInput: $deleteTvInput) {
      success
      message
    }
  }
`;
