import { Grid2X2 } from "lucide-react";
import { routes } from "@shared/routes";
import { ViewType } from "@shared/api";
import { IconButton } from "@shared/ui";

export function IconThumbnails({
  ytChannelId,
  totalThumbnails = 0,
}: {
  ytChannelId?: string;
  totalThumbnails?: number;
}) {
  const to = ytChannelId ? routes.thumbnails() : routes.dashboard(ViewType.Thumbnails);
  
  return (
    <IconButton
      icon={<Grid2X2 />}
      to={to}
      tip={totalThumbnails}
      tooltip={{
        content: "thumbnails",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
