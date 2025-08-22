import {
  useCreateChannelMutation,
  ChannelMessage,
} from "@shared/api/generated/graphql";

type Props = {
  onCreated: (message: string) => void;
  onAlreadyExists: (ytChannelId: string) => void;
  onInvalidVideoId: (message: string) => void;
  onFailedToCreate: (message: string) => void;
};

const messages: Record<ChannelMessage, string> = {
  [ChannelMessage.CreatedSuccessfully]: "Channel created successfully!",
  [ChannelMessage.AlreadyExists]: "Channel already exists",
  [ChannelMessage.InvalidVideoId]: "Invalid YouTube video ID",
  [ChannelMessage.FailedToCreate]: "Failed to create channel",
};

export default function useCreateChannel({
  onCreated,
  onAlreadyExists,
  onInvalidVideoId,
  onFailedToCreate,
}: Props) {
  const [createChannel] = useCreateChannelMutation({
    onCompleted({ createChannel: { ytChannelId, message } }) {
      switch (message) {
        case ChannelMessage.CreatedSuccessfully:
          onCreated(messages[message]);
          return;
        case ChannelMessage.AlreadyExists:
          onAlreadyExists(ytChannelId as string);
          return;
        case ChannelMessage.InvalidVideoId:
          onInvalidVideoId(messages[message]);
          return;
        case ChannelMessage.FailedToCreate:
          onFailedToCreate(messages[message]);
          return;
        default:
          break;
      }
    },
  });

  return createChannel;
}
