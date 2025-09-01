import { Button } from "@shared/ui";
import { Download } from "lucide-react";
import { useDownload } from "@features/Upload";
import { useTypedParams } from "@shared/hooks";

export default function DownloadAll() {
  const ytChannelId = useTypedParams("ytChannelId");
  const downloadMutation = useDownload();

  const handleDownloadAll = () => {
    downloadMutation.mutate([{ ytChannelId, downloadOption: 0 }]);
  };

  return (
    <Button
      onClick={handleDownloadAll}
      leftIcon={<Download />}
      color="accent"
      variant="outline"
    >
      Download All
    </Button>
  );
}
