import { Button } from "@shared/ui";
import { useDeleteUploads } from "@features/Upload";

type Props = {
  handleSideEffect: () => void;
  ytChannelId: string;
  ytVideoIds: string[];
};

export function DeleteUpload({ handleSideEffect, ytChannelId, ytVideoIds }: Props) {
  const deleteUploadFromDbMutation = useDeleteUploads(handleSideEffect);
  const handleDelete = (ytVideoIds: string[]) => {
    deleteUploadFromDbMutation({
      ytChannelId,
      ytVideoIds,
    }).then(handleSideEffect);
  };

  return (
    <Button color="error" variant="outline" onClick={() => handleDelete(ytVideoIds)}>
      Delete
    </Button>
  );
}
