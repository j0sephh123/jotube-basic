import { Button } from "@shared/ui";
import { Trash2 } from "lucide-react";
import { useTypedParams } from "@shared/hooks";
import { useDeleteUploads } from "@features/Upload";

export default function RemoveAll() {
  const ytChannelId = useTypedParams("ytChannelId");

  const deleteUploadsMutation = useDeleteUploads(() => {
    // Refetch will be handled by the mutation
  });

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
