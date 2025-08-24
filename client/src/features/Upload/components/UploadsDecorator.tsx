import { useRefetchChannelMetadata } from "@entities/Channel";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useQueue } from "@shared/hooks";
import {
  type SavedUploadsProps,
  type DefaultUploadsProps,
  useRefetchChannelUploads,
} from "@features/Upload";
import { useUploads } from "@features/Upload";

type Props = {
  Component: React.ComponentType<SavedUploadsProps | DefaultUploadsProps>;
  type: "default" | "saved";
};

export function UploadsDecorator({ Component, type }: Props) {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchQueue } = useQueue();
  const refetchDefaultUploads = useRefetchChannelUploads(ytChannelId);
  const { data } = useUploads(ytChannelId, type);

  const handleSideEffect = () => {
    refetchChannelMetadata();
    refetchDefaultUploads();

    if (type === "saved") {
      refetchQueue();
    }
  };

  if (!data) return null;

  return (
    <Component
      ytChannelId={ytChannelId}
      handleSideEffect={handleSideEffect}
      data={{ uploadsList: data }}
    />
  );
}
