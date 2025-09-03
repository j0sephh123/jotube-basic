import { useQueue, useTypedParams } from "@shared/hooks";
import { type UploadsType, useRefetchChannelUploads } from "@features/Upload";
import { useUploads } from "@features/Upload";
import UploadsList from "./UploadsList";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

type Props = {
  type: UploadsType;
};

export function UploadsDecorator({ type }: Props) {
  const ytChannelId = useTypedParams("ytChannelId");
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
    <UploadsList
      ytChannelId={ytChannelId}
      handleSideEffect={handleSideEffect}
      data={{ uploadsList: data }}
      type={type}
    />
  );
}
