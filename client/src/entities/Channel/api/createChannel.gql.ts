import { gql } from "@apollo/client";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($createChannelInput: CreateChannelInput!) {
    createChannel(createChannelInput: $createChannelInput) {
      message
      ytChannelId
    }
  }
`;