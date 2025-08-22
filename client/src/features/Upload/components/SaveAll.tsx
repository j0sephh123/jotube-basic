import { Button } from "@shared/ui";
import { useSaveUpload } from "@features/Upload";
import { useTypedChannelYtId } from "@features/Dashboard";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useRefetchSavedUploads } from "@features/Upload";

type Props = {
  uploadsToSave: {
    ytVideoId: string;
    ytChannelId: string;
  }[];
};

export default function SaveAll({ uploadsToSave }: Props) {
  const ytChannelId = useTypedChannelYtId();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchSavedUploads = useRefetchSavedUploads(ytChannelId);

  const saveUploadMutation = useSaveUpload(() => {
    refetchChannelMetadata(ytChannelId);
    refetchSavedUploads();
  });

  const handleSaveAll = () => {
    if (uploadsToSave.length > 0) {
      saveUploadMutation({ uploads: uploadsToSave });
    }
  };

  return (
    <Button onClick={handleSaveAll} color="success" variant="outline">
      Save All
    </Button>
  );
}
