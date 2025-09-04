import { FolderOpen } from "lucide-react";
import { useOpenDirectory } from "@shared/ui";
import { type OpenDirectoryRequest } from "./useOpenDirectory";

export default function OpenDirectoryButton(props: OpenDirectoryRequest) {
  const handleOpenDirectory = useOpenDirectory(props);

  return (
    <button onClick={() => handleOpenDirectory()} className="btn btn-ghost">
      <FolderOpen className="h-4 w-4 mr-2" />
    </button>
  );
}
