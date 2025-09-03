import { Button } from "@shared/ui";
import { useDeleteUploads } from "@features/Upload";

type Props = {
  handleSideEffect: () => void;
  channelId: number;
  ytVideoIds: string[];
};

export function DeleteUpload({
  handleSideEffect,
  channelId,
  ytVideoIds,
}: Props) {
  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);
  const handleDelete = (ytVideoIds: string[]) => {
    deleteUploadFromDbMutation({
      channelId,
      ytVideoIds,
    }).then(handleSideEffect);
  };

  return (
    <Button
      color="error"
      variant="outline"
      onClick={() => handleDelete(ytVideoIds)}
    >
      Delete
    </Button>
  );
}
