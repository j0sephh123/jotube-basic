import { useState, useRef, useEffect } from "react";
import { MoreVertical, FolderOpen } from "lucide-react";
import CopyValue from "@/shared/components/CopyValue";
import { useStore } from "@/store/store";

type CardMenuProps = {
  id: number;
  ytId: string;
  onOpenExplorer: () => void;
  onClose?: () => void;
};

function CardMenu({ id, ytId, onOpenExplorer, onClose }: CardMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const addToIgnoreList = useStore((state) => state.addToIgnoreList);
  const isIgnored = useStore((state) => state.isIgnored);

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

  const handleAddToIgnoreList = () => {
    addToIgnoreList(ytId, "");
    setIsMenuOpen(false);
    onClose?.();
  };

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
    onOpenExplorer();
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

            <div className="border-t border-gray-700 my-1"></div>

            <button
              onClick={handleAddToIgnoreList}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                isIgnored(ytId)
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
              disabled={isIgnored(ytId)}
            >
              <span
                className={`w-4 h-4 flex items-center justify-center ${
                  isIgnored(ytId) ? "text-gray-500" : "text-red-400"
                }`}
              >
                {isIgnored(ytId) ? "✓" : "×"}
              </span>
              <span>
                {isIgnored(ytId) ? "Already ignored" : "Add to ignore list"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardMenu;
