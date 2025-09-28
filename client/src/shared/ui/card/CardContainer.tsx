import type { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  className?: string;
};

function CardContainer({ children, className = "" }: CardContainerProps) {
  return (
    <div
      data-testid="card-container"
      className={`flex flex-col w-full bg-gray-800 border-2 rounded-lg shadow-lg group relative border-gray-600 hover:border-gray-500 ${className}`}
    >
      {children}
    </div>
  );
}

export default CardContainer;
