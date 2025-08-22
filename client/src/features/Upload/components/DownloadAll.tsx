import { Button } from "@shared/ui";
import { Download } from "lucide-react";
import { useDownload } from "@features/Upload";
import { useTypedChannelYtId } from "@features/Dashboard";

export default function DownloadAll() {
  const ytChannelId = useTypedChannelYtId();
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
