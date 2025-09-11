import { ListMusic } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@shared/ui";
import { ReactNode } from "react";

export default function PlaylistsPopoverTrigger({
  playlistCount,
  customTrigger,
  onClick,
}: {
  playlistCount: number;
  customTrigger?: ReactNode;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (customTrigger) {
    return (
      <PopoverPrimitive.Trigger asChild>
        <div onClick={handleClick}>{customTrigger}</div>
      </PopoverPrimitive.Trigger>
    );
  }

  return (
    <PopoverPrimitive.Trigger asChild>
      <Button variant="ghost" className="btn-circle" onClick={handleClick}>
        <ListMusic className="h-5 w-5" />
      </Button>
    </PopoverPrimitive.Trigger>
  );
}
