import type { PropsWithChildren, ReactNode } from "react";
import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

// Local button component to avoid shared dependency
const LocalButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="btn btn-primary btn-sm" {...props}>
      {children}
    </button>
  );
};

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
        <LocalButton>
          {icon}
          <span className="ml-1">{buttonLabel}</span>
        </LocalButton>
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
