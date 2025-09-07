import { type ReactNode } from "react";

interface MenuProps {
  items: ReactNode[];
  buttonText?: string;
}

export default function Menu({ items, buttonText = "Menu" }: MenuProps) {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        {buttonText}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
