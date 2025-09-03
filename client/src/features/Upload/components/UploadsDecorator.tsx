import { useQueue } from "@shared/hooks";
import { type UploadsType, useRefetchChannelUploads } from "@features/Upload";
import { useUploads } from "@features/Upload";
import UploadsList from "./UploadsList";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { YtIdToId } from "@shared/hoc";

type Props = {
  type: UploadsType;
  channelId: number;
  ytChannelId: string;
};

function UploadsDecoratorInner({ type, channelId, ytChannelId }: Props) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchQueue } = useQueue();
  const refetchDefaultUploads = useRefetchChannelUploads();
  const { data } = useUploads(channelId, type);

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
      channelId={channelId}
      handleSideEffect={handleSideEffect}
      data={{ uploadsList: data }}
      type={type}
    />
  );
}

export const UploadsDecorator = YtIdToId(UploadsDecoratorInner);
