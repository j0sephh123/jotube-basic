import { useCreateChannelMutation } from "@/generated/graphql";

type Props = {
  onCreated: () => void;
  onAlreadyExists: (ytChannelId: string) => void;
};

export default function useCreateChannel({
  onCreated,
  onAlreadyExists,
}: Props) {
  const [createChannel] = useCreateChannelMutation({
    onCompleted({ createChannel: { success, ytChannelId } }) {
      if (success) {
        onCreated();
      } else if (ytChannelId) {
        onAlreadyExists(ytChannelId);
      }
    },
  });

  return createChannel;
}
