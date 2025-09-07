import { useQueue } from "@shared/hooks";
import { type UploadsType, useRefetchChannelUploads } from "@features/Upload";
import { useUploads } from "@features/Upload";
import UploadsList from "./UploadsList";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { YtIdToId } from "@shared/hoc";
import { IdType } from "@shared/api";

type Props = {
  uploadsType: UploadsType;
  channelId: number;
  ytChannelId: string;
};

function UploadsDecoratorInner({ uploadsType, channelId }: Props) {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchQueue } = useQueue();
  const refetchDefaultUploads = useRefetchChannelUploads();
  const { data } = useUploads({
    id: { type: IdType.Channel, value: channelId },
    uploadsType,
  });

  const handleSideEffect = () => {
    refetchChannelMetadata();
    refetchDefaultUploads();

    if (uploadsType === "saved") {
      refetchQueue();
    }
  };

  if (!data) return null;

  return (
    <UploadsList handleSideEffect={handleSideEffect} data={data} uploadsType={uploadsType} />
  );
}

export const UploadsDecorator = YtIdToId(UploadsDecoratorInner);
