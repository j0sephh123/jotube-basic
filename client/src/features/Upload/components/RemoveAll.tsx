import { Button } from "@shared/ui";
import { Trash2 } from "lucide-react";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useUploadsDelete } from "@features/Upload";

export default function RemoveAll() {
  const ytChannelId = useTypedChannelYtId();

  const deleteUploadsMutation = useUploadsDelete(() => {
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
