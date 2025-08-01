import useAddUploadsToQueue from "@/features/Upload/hooks/useAddUploadsToQueue";
import useUploadsList from "@/features/Upload/hooks/useUploadsList";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useRefetchSavedUploads } from "@/features/Upload/hooks/useSavedUploads";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useSearchParams } from "react-router-dom";
import { SortOrder } from "@/shared/types/searchParams";

type Props = {
  ytChannelId: string;
  isSavedPage: boolean;
  isIndexPage: boolean;
};

const BulkOperations = ({ ytChannelId, isSavedPage, isIndexPage }: Props) => {
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "desc") as SortOrder;

  const downloadMutation = useAddUploadsToQueue();
  const { data: channelData } = useUploadsList(ytChannelId, sortOrder);
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchSavedUploads = useRefetchSavedUploads(ytChannelId);
  
  const saveUploadMutation = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
    refetchSavedUploads();
  });

  const deleteUploadsMutation = useDeleteUploads(() => {
    refetchSavedUploads();
    refetchChannelMetadata(ytChannelId);
  });

  const handleDownloadAll = () => {
    downloadMutation.mutate([{ ytChannelId, downloadOption: 0 }]);
  };

  const handleSaveAll = () => {
    if (!channelData?.uploads) return;

    const uploadsToSave = channelData.uploads
      .filter(
        (upload) =>
          upload.artifact !== "SAVED" && upload.artifact !== "DOWNLOADED"
      )
      .map((upload) => ({
        ytVideoId: upload.ytId,
        ytChannelId: ytChannelId,
      }));

    if (uploadsToSave.length > 0) {
      saveUploadMutation({ uploads: uploadsToSave });
    }
  };

  const handleRemoveAll = () => {
    deleteUploadsMutation({
      ytChannelId,
      ytVideoIds: [],
    });
  };

  return (
    <div className="flex gap-2">
      {isSavedPage && (
        <button
          onClick={handleDownloadAll}
          className="btn btn-primary"
        >
          Download All
        </button>
      )}
      {isIndexPage && (
        <button onClick={handleSaveAll} className="btn btn-success">
          Save All
        </button>
      )}
      {isSavedPage && (
        <button onClick={handleRemoveAll} className="btn btn-error">
          Remove All
        </button>
      )}
    </div>
  );
};

export default BulkOperations; 