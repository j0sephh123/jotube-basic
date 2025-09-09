import { Zap } from "lucide-react";

export function AutoDLLabel() {
  return (
    <div className="badge badge-warning gap-1">
      <Zap className="h-3 w-3" />
      <span>Auto Download</span>
    </div>
  );
}
