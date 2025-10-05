import { UploadsListItem, useRemoveFromQueue } from "@features/Upload";
import { type UploadsType } from "@shared/types";
import { type UploadsListQueryResult } from "@shared/api";
// eslint-disable-next-line boundaries/element-types
import { Virtualizer } from "@widgets/Virtualizer";
import { useMemo, useState } from "react";
import { useQueue, useRefetchQueue } from "@shared/hooks";

export type UploadsListProps = {
  handleSideEffect: () => void;
  data: UploadsListQueryResult["data"];
  uploadsType: UploadsType;
};

export default function UploadsList({
  handleSideEffect,
  data,
  uploadsType,
}: UploadsListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const uploadsToUse = useMemo(
    () =>
      data?.uploadsList?.map((upload) => ({
        upload,
        uploadsType,
        handleSideEffect,
      })) ?? [],
    [data?.uploadsList, handleSideEffect, uploadsType]
  );

  const queue = useQueue();
  const removeFromQueue = useRemoveFromQueue();
  const refetchQueue = useRefetchQueue();

  const handleCardSelect = (id: string) => {
    console.log("Card clicked", id);
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <Virtualizer
      items={uploadsToUse}
      ItemComponent={({ item }) => {
        const queueItem = queue.data?.find(
          (q) => q.ytVideoId === item.upload.ytId
        );
        const processingStatus = () => {
          if (
            queueItem?.processingType === "processing" ||
            queueItem?.processingType === "download"
          ) {
            return "processing";
          }
          if (queueItem?.processingType === "storyboarding") {
            return "storyboarding";
          }
          return "none";
        };
        const status = processingStatus();

        return (
          <UploadsListItem
            upload={item.upload}
            uploadsType={item.uploadsType}
            handleSideEffect={item.handleSideEffect}
            processingStatus={status}
            onProcessingCancel={async () => {
              if (queueItem?.id) {
                await removeFromQueue([queueItem.id]);
                refetchQueue();
              }
            }}
            processingState={queueItem?.state ?? "waiting"}
            processingType={queueItem?.processingType}
            onCardClick={handleCardSelect}
            isSelected={selectedIds.includes(item.upload.id.toString())}
          />
        );
      }}
      flexibleHeight={true}
    />
  );
}
