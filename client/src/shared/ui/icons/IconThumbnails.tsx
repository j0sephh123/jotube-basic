import { Grid2X2 } from "lucide-react";
import { type To } from "@shared/types";
import { IconButton } from "@shared/ui";

export function IconThumbnails({
  ytChannelId,
  totalThumbnails = 0,
}: {
  ytChannelId?: string;
  totalThumbnails?: number;
}) {
  const to: To = ytChannelId
    ? `/thumbnails`
    : `/dashboard/channels/thumbnails`;

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
