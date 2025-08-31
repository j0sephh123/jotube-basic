import { type To } from "@shared/types";
import { Link } from "react-router-dom";

export type CustomLinkProps = {
  to: To;
  children: React.ReactNode;
  className?: string;
};

export function CustomLink({ to, children, className }: CustomLinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
