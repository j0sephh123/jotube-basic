import { Video } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type QueueItem } from "@shared/hooks";
import { Button } from "@shared/ui";

export default function VideoProcessingInfoTrigger({
  queueData,
  isDisabled,
}: {
  queueData: QueueItem[];
  isDisabled: boolean;
}) {
  return (
    <PopoverPrimitive.Trigger asChild>
      <Button
        variant="ghost"
        className="btn-circle relative"
        disabled={isDisabled}
      >
        <Video className="h-5 w-5" />
        {queueData.length > 0 && (
          <span className="absolute -top-1 -right-1 badge badge-xs badge-primary rounded-full">
            {queueData.length}
          </span>
        )}
      </Button>
    </PopoverPrimitive.Trigger>
  );
}
