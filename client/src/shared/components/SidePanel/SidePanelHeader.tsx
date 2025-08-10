import Button from "@/shared/button";
import { useSidePanel } from "@/store/store";
import { X } from "lucide-react";

type Props = {
  amount: number;
};

export default function SidePanelHeader({ amount }: Props) {
  const closeSidePanel = useSidePanel((s) => s.closeSidePanel);

  return (
    <div className="sticky top-0 z-10 p-2 border-b border-base-300 bg-base-200">
      <div className="flex items-center gap-4">
        <Button
          onClick={closeSidePanel}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="w-5 h-5" />
        </Button>
        <p className="text-sm text-base-content/70 mt-1">
          {amount} screenshot
          {amount !== 1 ? "s" : ""} found
        </p>
      </div>
    </div>
  );
}
