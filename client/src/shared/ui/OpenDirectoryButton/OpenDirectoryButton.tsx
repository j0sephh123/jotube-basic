import { FolderOpen } from "lucide-react";
import { useOpenDirectory } from "@shared/ui";

export default function OpenExplorerButton(props: {
  ytChannelId: string;
  ytVideoId?: string;
}) {
  const handleOpenDirectory = useOpenDirectory(props);

  return (
    <button onClick={() => handleOpenDirectory()} className="btn btn-ghost">
      <FolderOpen className="h-4 w-4 mr-2" />
    </button>
  );
}
