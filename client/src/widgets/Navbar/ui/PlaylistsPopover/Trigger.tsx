import { ListMusic } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@shared/ui";

export default function PlaylistsPopoverTrigger({
  playlistCount,
}: {
  playlistCount: number;
}) {
  return (
    <PopoverPrimitive.Trigger asChild>
      <Button variant="ghost" className="btn-circle relative">
        <ListMusic className="h-5 w-5" />
        {playlistCount > 0 && (
          <span className="absolute -top-1 -right-1 badge badge-xs badge-primary rounded-full">
            {playlistCount}
          </span>
        )}
      </Button>
    </PopoverPrimitive.Trigger>
  );
}
