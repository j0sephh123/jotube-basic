import type { ReactNode } from "react";

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div
      data-testid="card-content"
      className={`p-3 flex flex-col gap-2 ${className}`}
    >
      {children}
    </div>
  );
}

export default CardContent;
