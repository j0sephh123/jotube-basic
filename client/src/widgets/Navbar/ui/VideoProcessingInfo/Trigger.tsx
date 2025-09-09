import { Video, Zap } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type QueueItem } from "@shared/hooks";
import { Button } from "@shared/ui";
import { useSettingsQuery } from "@features/Settings";

export default function VideoProcessingInfoTrigger({
  queueData,
  isDisabled,
}: {
  queueData: QueueItem[];
  isDisabled: boolean;
}) {
  const { data: { autoDownload = false } = {} } = useSettingsQuery();

  return (
    <PopoverPrimitive.Trigger asChild>
      <Button
        variant="ghost"
        className="btn-circle relative"
        disabled={isDisabled}
      >
        <Video className="h-5 w-5" />
        {autoDownload && (
          <div className="absolute -top-1 -left-1 bg-yellow-400 text-zinc-900 rounded-full p-0.5">
            <Zap className="h-3 w-3" />
          </div>
        )}
        {queueData.length > 0 && (
          <span className="absolute -top-1 -right-1 badge badge-xs badge-primary rounded-full">
            {queueData.length}
          </span>
        )}
      </Button>
    </PopoverPrimitive.Trigger>
  );
}
