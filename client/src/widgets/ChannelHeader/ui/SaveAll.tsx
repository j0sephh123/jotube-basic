import { Button } from "@shared/ui";
import { useSaveUpload } from "@features/Upload";
import { useTypedParams } from "@shared/hooks";
import { useRefetchChannelUploads } from "@features/Upload";
// eslint-disable-next-line import/no-internal-modules
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

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
