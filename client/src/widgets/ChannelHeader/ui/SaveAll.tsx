import { Button } from "@shared/ui";
import { useSaveUpload } from "@features/Upload";
import { useTypedParams } from "@shared/hooks";
import { useRefetchChannelMetadata } from "@entities/Channel";
import { useRefetchChannelUploads } from "@features/Upload";

type Props = {
  uploadsToSave: {
    ytVideoId: string;
    ytChannelId: string;
  }[];
};

export default function SaveAll({ uploadsToSave }: Props) {
  const ytChannelId = useTypedParams("ytChannelId");
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const refetchChannelUploads = useRefetchChannelUploads(ytChannelId);

  const saveUploadMutation = useSaveUpload(() => {
    refetchChannelMetadata();
    refetchChannelUploads();
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
