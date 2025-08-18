import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "@/shared/lib/useClickOutside";
import { BookImage } from "lucide-react";
import {
  getCurrentDay,
  getCurrentMonth,
  getLastDay,
  getLastMonth,
} from "@/shared/utils/date";

const items = [
  { name: "This year", link: "screenshots" },
  { name: "This month", link: `screenshots/${getCurrentMonth()}` },
  { name: "Last month", link: `screenshots/${getLastMonth()}` },
  { name: "Yesterday", link: `screenshots/${getLastDay()}` },
  { name: "Today", link: `screenshots/${getCurrentDay()}` },
];

export default function Screenshots() {
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
        <BookImage />
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
