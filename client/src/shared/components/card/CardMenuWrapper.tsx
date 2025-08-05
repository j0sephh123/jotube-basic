import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import CardMenu from "./CardMenu";

type CardMenuWrapperProps = {
  id: number;
  ytId: string;
  onOpenExplorer: () => void;
};

export default function CardMenuWrapper({
  id,
  ytId,
  onOpenExplorer,
}: CardMenuWrapperProps) {
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
        <CardMenu
          id={id}
          ytId={ytId}
          onOpenExplorer={onOpenExplorer}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
