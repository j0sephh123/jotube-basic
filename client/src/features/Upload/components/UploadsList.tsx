import { UploadsListItem, type UploadsType } from "@features/Upload";
import { type UploadsListQueryResult } from "@shared/api";
import { useQueue } from "@shared/hooks";

export type UploadsListProps = {
  ytChannelId: string;
  channelId: number;
  handleSideEffect: () => void;
  data: UploadsListQueryResult["data"];
  type: UploadsType;
};

export default function UploadsList({
  ytChannelId,
  channelId,
  handleSideEffect,
  data,
  type,
}: UploadsListProps) {
  const { data: queue } = useQueue();

  const filteredUploads = data?.uploadsList?.uploads.filter((upload) => {
    if (type === "saved") {
      const isDownloading = queue?.some(
        (item) => item.ytVideoId === upload.ytId
      );
      return !isDownloading;
    }
    return true;
  });

  return (
    <>
      {filteredUploads?.map((upload) => (
        <UploadsListItem
          key={upload.id}
          upload={upload}
          channelId={channelId}
          ytChannelId={ytChannelId}
          type={type}
          handleSideEffect={handleSideEffect}
        />
      ))}
    </>
  );
}
