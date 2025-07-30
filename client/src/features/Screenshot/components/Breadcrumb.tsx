import { Link } from "react-router-dom";

type BreadcrumbProps = {
  items: { label: string; path: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps): JSX.Element {
  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
