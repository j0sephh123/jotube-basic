import Button from "@/shared/button";
import { Trash2 } from "lucide-react";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";
import { useRefetchSavedUploads } from "../hooks/useSavedUploads";
import { useDeleteUploads } from "../hooks/useUploadsDelete";

export default function RemoveAll() {
  const ytChannelId = useTypedChannelYtId();
  const refetchSavedUploads = useRefetchSavedUploads(ytChannelId);

  const deleteUploadsMutation = useDeleteUploads(refetchSavedUploads);

  const handleRemoveAll = () => {
    deleteUploadsMutation({
      ytChannelId,
      ytVideoIds: [],
    });
  };

  return (
    <Button
      onClick={handleRemoveAll}
      leftIcon={<Trash2 />}
      color="error"
      variant="outline"
    >
      Remove All
    </Button>
  );
}
