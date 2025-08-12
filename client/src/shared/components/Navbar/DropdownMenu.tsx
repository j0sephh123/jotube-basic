import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

type DropdownItem = {
  name: string;
  link: string;
};

type DropdownMenuProps = {
  title: string;
  items: DropdownItem[];
};

export default function DropdownMenu({
  title,
  items,
}: DropdownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-ghost flex items-center relative z-10"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`ml-1 w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 bg-base-100 p-2 shadow-md rounded-box w-56 z-20 border border-base-300">
          {items.map((item, i) => (
            <li key={`${item.link}-${i}`}>
              <Link
                to={item.link}
                className="block px-2 py-1 hover:bg-base-200 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
