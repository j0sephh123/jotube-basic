import { useSidePanel } from "@app/index";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SidePanelWrapper({ children }: Props) {
  const closeSidePanel = useSidePanel((s) => s.closeSidePanel);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeSidePanel}
      />
      <div className="fixed right-0 top-0 h-full w-196 bg-base-100 border-l border-base-300 shadow-xl z-50 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
