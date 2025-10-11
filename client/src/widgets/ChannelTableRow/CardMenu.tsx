import { useState, useRef } from "react";
import { MoreVertical, X } from "lucide-react";
import { CopyValue, OpenDirectoryButton, useClickOutside } from "@shared/ui";

type CardMenuProps = {
  id: number;
  ytId: string;
  playlist?: {
    id: number;
    name: string;
  } | null;
  onRemoveFromPlaylist?: (id: number) => void;
};

export function CardMenu({
  id,
  ytId,
  playlist,
  onRemoveFromPlaylist,
}: CardMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id.toString());
    setIsMenuOpen(false);
  };

  const handleCopyYoutubeId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ytId);
    setIsMenuOpen(false);
  };

  const handleRemoveFromPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFromPlaylist) {
      onRemoveFromPlaylist(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex-shrink-0" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="btn btn-ghost btn-sm btn-circle transition-colors hover:bg-gray-700"
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
            <OpenDirectoryButton collection={ytId} />
            {playlist && onRemoveFromPlaylist && (
              <button
                onClick={handleRemoveFromPlaylist}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Remove from Playlist</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
