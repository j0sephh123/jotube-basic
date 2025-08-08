import { PropsWithChildren, ReactNode, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Button from "@/shared/button";

type CommonRangeFilterPopoverProps = PropsWithChildren<{
  buttonLabel: string;
  title: string;
  icon: ReactNode;
}>;

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
        <Button color="info" variant="outline" size="sm">
          {icon}
          <span className="ml-1">{buttonLabel}</span>
        </Button>
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
