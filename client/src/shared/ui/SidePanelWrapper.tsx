import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function SidePanelWrapper({ children, onClose }: Props) {

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-196 bg-base-100 border-l border-base-300 shadow-xl z-50 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
