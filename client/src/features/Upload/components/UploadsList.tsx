import {
  UploadsListItem,
  useRemoveFromQueue,
  YearFilter,
} from "@features/Upload";
import { type UploadsType } from "@shared/types";
import { type UploadsListQueryResult } from "@shared/api";
// eslint-disable-next-line boundaries/element-types
import { Virtualizer } from "@widgets/Virtualizer";
import { useMemo } from "react";
import { useQueue, useRefetchQueue } from "@shared/hooks";

export type UploadsListProps = {
  handleSideEffect: () => void;
  data: UploadsListQueryResult["data"];
  uploadsType: UploadsType;
  yearCounts?: { year: number; count: number }[];
  selectedYear?: number | null;
  onYearChange?: (year: number | null) => void;
};

export default function UploadsList({
  handleSideEffect,
  data,
  uploadsType,
  yearCounts,
  selectedYear,
  onYearChange,
}: UploadsListProps) {
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

  return (
    <>
      {yearCounts && onYearChange && (
        <YearFilter
          years={yearCounts}
          selectedYear={selectedYear || null}
          onYearChange={onYearChange}
        />
      )}
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
            />
          );
        }}
        flexibleHeight={true}
      />
    </>
  );
}
