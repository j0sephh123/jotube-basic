import { UploadsListItem, type UploadsType } from "@features/Upload";
import { type UploadsListQueryResult } from "@shared/api";
// eslint-disable-next-line boundaries/element-types
import { Virtualizer } from "@widgets/Virtualizer";
import { useMemo } from "react";

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
  const uploadsToUse = useMemo(
    () =>
      data?.uploadsList?.map((upload) => ({
        upload,
        uploadsType,
        handleSideEffect,
      })) ?? [],
    [data?.uploadsList, handleSideEffect, uploadsType]
  );

  return (
    <Virtualizer
      items={uploadsToUse}
      ItemComponent={({ item }) => (
        <UploadsListItem
          upload={item.upload}
          uploadsType={item.uploadsType}
          handleSideEffect={item.handleSideEffect}
        />
      )}
      flexibleHeight={true}
    />
  );
}
