import { Button } from "@shared/ui";
import { Settings } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type PropsWithChildren, useState } from "react";

export function PopoverWrapper({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button variant="ghost" className="btn-circle">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="end"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[500px] z-50"
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
