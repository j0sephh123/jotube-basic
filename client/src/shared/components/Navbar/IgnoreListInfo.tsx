import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { EyeOff, X } from "lucide-react";
import { useStore } from "@/store/store";

export default function IgnoreListInfo() {
  const ignoreList = useStore((state) => state.ignoreList);
  const removeFromIgnoreList = useStore((state) => state.removeFromIgnoreList);
  const clearIgnoreList = useStore((state) => state.clearIgnoreList);
  const [isOpen, setIsOpen] = useState(false);

  const hasItems = ignoreList.length > 0;

  const handleRemoveItem = (ytId: string): void => {
    removeFromIgnoreList(ytId);
  };

  const handleClearAll = () => {
    clearIgnoreList();
  };

  const truncateId = (id: string, maxLength = 12): string => {
    if (id.length <= maxLength) return id;
    return id.substring(0, maxLength) + "...";
  };

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button className="btn btn-ghost btn-circle relative">
          <EyeOff className="h-5 w-5" />
          {hasItems && (
            <span className="absolute -top-1 -right-1 badge badge-xs badge-secondary rounded-full">
              {ignoreList.length}
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[400px] max-h-[500px] overflow-auto z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              Ignored Channels
            </h3>
            {hasItems && (
              <button onClick={handleClearAll} className="btn btn-sm btn-error">
                Clear All
              </button>
            )}
          </div>

          {!hasItems ? (
            <p className="text-zinc-400">No ignored channels</p>
          ) : (
            <div className="space-y-2">
              {ignoreList.map((item) => (
                <div
                  key={item.ytId}
                  className="border border-zinc-700 rounded-md overflow-hidden bg-zinc-800/30"
                >
                  <div className="px-3 py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span
                          className="text-sm text-white truncate max-w-[280px]"
                          title={item.title}
                        >
                          {item.title}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          {truncateId(item.ytId, 16)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.ytId)}
                        className="btn btn-error btn-xs px-1 h-5 min-h-0"
                        title="Remove from ignore list"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
