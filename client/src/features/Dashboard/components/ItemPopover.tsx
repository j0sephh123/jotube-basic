import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import { PropsWithChildren } from "react";

type ItemPopoverProps = PropsWithChildren<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  side: "top" | "bottom" | "left" | "right";
  align: "center" | "start" | "end";
}>;

export default function ItemPopover({
  isOpen,
  onOpenChange,
  side,
  align,
  children,
}: ItemPopoverProps) {
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        <button className="absolute top-2 right-2 btn btn-ghost btn-sm btn-circle bg-black bg-opacity-50 hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100">
          <Info className="w-4 h-4 text-white" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[300px] z-50"
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
