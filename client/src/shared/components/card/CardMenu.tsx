import { useState, useRef, useEffect } from "react";
import { MoreVertical, FolderOpen } from "lucide-react";
import CopyValue from "@/shared/components/CopyValue";
import { useOpenDirectory } from "../OpenDirectoryButton/useOpenDirectory";

type CardMenuProps = {
  id: number;
  ytId: string;
  onClose?: () => void;
};

function CardMenu({ id, ytId, onClose }: CardMenuProps) {
  const handleOpenExplorer = useOpenDirectory({ ytChannelId: ytId });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id.toString());
    setIsMenuOpen(false);
    onClose?.();
  };

  const handleCopyYoutubeId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ytId);
    setIsMenuOpen(false);
    onClose?.();
  };

  const handleOpenExplorerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenExplorer();
    setIsMenuOpen(false);
    onClose?.();
  };

  return (
    <div className="relative flex-shrink-0" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={`btn btn-ghost btn-sm btn-circle transition-colors ${"hover:bg-gray-700"}`}
      >
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px] z-50">
          <div className="flex flex-col gap-1">
            <button
              onClick={handleCopyId}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <CopyValue type="id" value={id.toString()} />
              <span>Copy ID</span>
            </button>
            <button
              onClick={handleCopyYoutubeId}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <CopyValue type="youtube" value={ytId} />
              <span>Copy YouTube ID</span>
            </button>
            <button
              onClick={handleOpenExplorerClick}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <FolderOpen className="w-4 h-4 text-gray-400" />
              <span>Open Directory</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardMenu;
