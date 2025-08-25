import * as PopoverPrimitive from "@radix-ui/react-popover";
import VideoProcessingInfoTrigger from "./Trigger";
import { type QueueItem } from "@shared/hooks";
import { type PropsWithChildren } from "react";

export default function VideoProcessingInfoWrapper({
  children,
  isOpen,
  setIsOpen,
  queueData,
  hasItems,
}: PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  queueData: QueueItem[];
  hasItems: boolean;
}>) {
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <VideoProcessingInfoTrigger
        queueData={queueData}
        isDisabled={!hasItems}
      />

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[500px] max-h-[800px] overflow-auto z-50"
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
