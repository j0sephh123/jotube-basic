import { useState, useRef, useEffect } from "react";
import type { ButtonWithDropdownProps } from "./types";

export function ButtonWithDropdown({
  buttonText,
  onButtonClick,
  dropdownItems,
}: ButtonWithDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="btn-group">
        <button
          className="btn btn-outline btn-sm rounded-r-none"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
        <button
          className="btn btn-outline btn-sm rounded-l-none -ml-px"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-base-100 border border-base-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            {dropdownItems.map((item, index) => (
              <div key={index} className="px-3 py-2 hover:bg-base-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
