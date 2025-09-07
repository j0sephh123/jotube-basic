import { UploadsListItem, type UploadsType } from "@features/Upload";
import { type UploadsListQueryResult } from "@shared/api";
import { useQueue } from "@shared/hooks";
// eslint-disable-next-line boundaries/element-types
import { Virtualizer } from "@widgets/Virtualizer";
import { useMemo } from "react";

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

  const uploadsToUse = useMemo(() => {
    return filteredUploads?.map((upload) => ({
      upload,
      channelId,
      ytChannelId,
      type,
      handleSideEffect,
    }));
  }, [channelId, filteredUploads, handleSideEffect, type, ytChannelId]);

  return (
    <Virtualizer
      items={uploadsToUse ?? []}
      ItemComponent={({ item }) => (
        <UploadsListItem
          upload={item.upload}
          channelId={item.channelId}
          ytChannelId={item.ytChannelId}
          type={item.type}
          handleSideEffect={item.handleSideEffect}
        />
      )}
      flexibleHeight={true}
    />
  );
}
