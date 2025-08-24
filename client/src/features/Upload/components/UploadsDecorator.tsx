import { useRefetchChannelMetadata } from "@entities/Channel";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useDefaultUploads } from "../hooks/useDefaultUploads";
import { useQueue } from "@shared/hooks";
import {
  useSavedUploads,
  type SavedUploadsProps,
  type DefaultUploadsProps,
} from "@features/Upload";

type Props = {
  Component: React.ComponentType<SavedUploadsProps | DefaultUploadsProps>;
  type: "default" | "saved";
};

export function UploadsDecorator({ Component, type }: Props) {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchDefaultUploads } = useDefaultUploads(ytChannelId);
  const { refetch: refetchQueue } = useQueue();
  const { refetch: refetchSavedUploads } = useSavedUploads(ytChannelId);

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
