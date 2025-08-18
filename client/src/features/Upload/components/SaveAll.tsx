import { Button } from "@shared/ui/button";
import { useSaveUpload } from "@features/Upload/hooks/useSaveUpload";
import { useTypedChannelYtId } from "@shared/hooks/useDashboardParams";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { useRefetchSavedUploads } from "@features/Upload/hooks/useSavedUploads";

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
