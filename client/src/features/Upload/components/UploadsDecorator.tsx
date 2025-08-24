import { useRefetchChannelMetadata } from "@entities/Channel";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useQueue } from "@shared/hooks";
import {
  type SavedUploadsProps,
  type DefaultUploadsProps,
  useRefetchSavedUploads,
  useRefetchChannelUploads,
} from "@features/Upload";

type Props = {
  Component: React.ComponentType<SavedUploadsProps | DefaultUploadsProps>;
  type: "default" | "saved";
};

export function UploadsDecorator({ Component, type }: Props) {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchQueue } = useQueue();
  const refetchDefaultUploads = useRefetchChannelUploads(ytChannelId);
  const refetchSavedUploads = useRefetchSavedUploads(ytChannelId);

  const handleSideEffect = () => {
    refetchChannelMetadata();

    if (type === "default") {
      refetchDefaultUploads();
      refetchSavedUploads();
    }

    if (type === "saved") {
      refetchQueue();
      refetchSavedUploads();
    }
  };

  return (
    <Component ytChannelId={ytChannelId} handleSideEffect={handleSideEffect} />
  );
}
