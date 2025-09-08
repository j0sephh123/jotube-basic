import * as PopoverPrimitive from "@radix-ui/react-popover";
import PlaylistsPopoverTrigger from "./Trigger.tsx";
import { type PropsWithChildren } from "react";

export default function PlaylistsPopoverWrapper({
  children,
  isOpen,
  setIsOpen,
  playlistCount,
}: PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  playlistCount: number;
}>) {
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PlaylistsPopoverTrigger playlistCount={playlistCount} />

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[400px] max-h-[600px] overflow-auto z-50"
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
