import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
import useDownload from "../hooks/useDownload";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";

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
