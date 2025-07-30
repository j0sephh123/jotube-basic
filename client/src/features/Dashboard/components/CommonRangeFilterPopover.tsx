import { ReactNode, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

type CommonRangeFilterPopoverProps = {
  buttonLabel: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function CommonRangeFilterPopover({
  buttonLabel,
  title,
  icon,
  children,
}: CommonRangeFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button className="btn btn-sm btn-outline">
          {icon}
          <span className="ml-1">{buttonLabel}</span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-96 rounded-md border bg-base-200 p-4 shadow-md outline-none"
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium">{title}</h3>
            {children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
