import { Zap } from "lucide-react";

export function AutoDlEnabledSection() {
  return (
    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-md p-3 mb-4">
      <div className="flex items-center gap-2 text-yellow-300">
        <Zap className="h-4 w-4" />
        <span className="text-sm">
          Auto Download is enabled - videos will be automatically processed
        </span>
      </div>
    </div>
  );
}
