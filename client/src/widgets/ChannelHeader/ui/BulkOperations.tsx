import {
  useDefaultUploads,
  DownloadAll,
  SaveAll,
  RemoveAll,
} from "@features/Upload";
import { useMemo } from "react";

type Props = {
  ytChannelId: string;
  isSavedPage: boolean;
  isIndexPage: boolean;
};

const BulkOperations = ({ ytChannelId, isSavedPage, isIndexPage }: Props) => {
  const { data: channelData } = useDefaultUploads(ytChannelId);

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
