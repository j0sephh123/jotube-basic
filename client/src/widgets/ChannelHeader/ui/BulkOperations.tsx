import {
  useUploadsList,
  DownloadAll,
  SaveAll,
  RemoveAll,
} from "@features/Upload";
import { useSearchParams } from "react-router-dom";
import { SortOrder } from "@shared/api";
import { useMemo } from "react";

type Props = {
  ytChannelId: string;
  isSavedPage: boolean;
  isIndexPage: boolean;
};

const BulkOperations = ({ ytChannelId, isSavedPage, isIndexPage }: Props) => {
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || SortOrder.Desc) as SortOrder;
  const { data: channelData } = useUploadsList(ytChannelId, sortOrder);

  const uploadsToSave = useMemo(
    () =>
      channelData?.uploads?.map((upload) => ({
        ytVideoId: upload.ytId,
        ytChannelId: ytChannelId,
      })) ?? [],
    [channelData, ytChannelId]
  );

  return (
    <div className="flex gap-2">
      {isSavedPage && <DownloadAll />}
      {isIndexPage && <SaveAll uploadsToSave={uploadsToSave} />}
      {isSavedPage && <RemoveAll />}
    </div>
  );
};

export default BulkOperations;
