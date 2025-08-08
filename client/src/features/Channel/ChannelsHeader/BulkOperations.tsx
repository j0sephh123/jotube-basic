import useAddUploadsToQueue from "@/features/Upload/hooks/useAddUploadsToQueue";
import useUploadsList from "@/features/Upload/hooks/useUploadsList";
import { useSaveUpload } from "@/features/Upload/hooks/useSaveUpload";
import { useDeleteUploads } from "@/features/Upload/hooks/useUploadsDelete";
import { useRefetchSavedUploads } from "@/features/Upload/hooks/useSavedUploads";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";
import { useSearchParams } from "react-router-dom";
import { SortOrder } from "@/shared/types/searchParams";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/shared/button";

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

  const deleteUploadsMutation = useDeleteUploads(refetchSavedUploads);

  const handleDownloadAll = () => {
    downloadMutation.mutate([{ ytChannelId, downloadOption: 0 }]);
  };

  const handleSaveAll = () => {
    if (!channelData?.uploads) return;

    const uploadsToSave = channelData.uploads.map((upload) => ({
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
        <Button
          onClick={handleDownloadAll}
          leftIcon={<Download />}
          color="accent"
          variant="outline"
        >
          Download All
        </Button>
      )}
      {isIndexPage && (
        <Button onClick={handleSaveAll} color="success" variant="outline">
          Save All
        </Button>
      )}
      {isSavedPage && (
        <Button
          onClick={handleRemoveAll}
          leftIcon={<Trash2 />}
          color="error"
          variant="outline"
        >
          Remove All
        </Button>
      )}
    </div>
  );
};

export default BulkOperations;
