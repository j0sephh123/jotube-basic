import { useQueue, useTypedParams } from "@shared/hooks";
import {
  useRefetchChannelUploads,
  useUploads,
  useUploadsYearCounts,
} from "@features/Upload";
import UploadsList from "./UploadsList";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { YtIdToId } from "@shared/hoc";
import { IdType } from "@shared/api";
import { useState, useEffect } from "react";

type Props = {
  channelId: number;
  ytChannelId: string;
};

function UploadsDecoratorInner({ channelId }: Props) {
  const uploadsType = useTypedParams("uploadsType");
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch: refetchQueue } = useQueue();
  const refetchDefaultUploads = useRefetchChannelUploads();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data } = useUploads({
    id: { type: IdType.Channel, value: channelId },
    uploadsType,
    year: selectedYear,
  });

  const { yearCounts } = useUploadsYearCounts({
    id: { type: IdType.Channel, value: channelId },
    uploadsType,
  });

  useEffect(() => {
    if (yearCounts.length > 0 && selectedYear === null) {
      setSelectedYear(yearCounts[0]?.year || null);
    }
  }, [yearCounts, selectedYear]);

  const handleSideEffect = () => {
    refetchChannelMetadata();
    refetchDefaultUploads();

    if (uploadsType === "saved") {
      refetchQueue();
    }
  };

  if (!data) return null;

  return (
    <UploadsList
      handleSideEffect={handleSideEffect}
      data={data}
      uploadsType={uploadsType}
      yearCounts={yearCounts}
      selectedYear={selectedYear}
      onYearChange={setSelectedYear}
    />
  );
}

export const UploadsDecorator = YtIdToId(UploadsDecoratorInner);
