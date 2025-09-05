import { gql } from "@apollo/client";

export const DELETE_CHANNEL = gql`
  mutation DeleteChannel($id: Float!) {
    deleteChannel(id: $id) {
      success
      message
    }
  }
`;