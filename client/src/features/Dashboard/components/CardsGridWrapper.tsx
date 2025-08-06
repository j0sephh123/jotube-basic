import { ReactNode } from "react";

type CardsGridWrapperProps = {
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
};

export default function CardsGridWrapper({ children }: CardsGridWrapperProps) {
  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
