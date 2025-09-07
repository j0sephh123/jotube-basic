import { Grid2X2 } from "lucide-react";
import { makeYtChannelId, type To } from "@shared/types";
import { IconButton } from "@shared/ui";

export function IconThumbnails({
  ytChannelId,
  count = 0,
}: {
  ytChannelId?: string;
  count?: number;
}) {
  const to: To = ytChannelId
    ? `/channels/${makeYtChannelId(ytChannelId)}/thumbnails`
    : `/dashboard/channels/thumbnails`;

  return (
    <IconButton
      icon={<Grid2X2 />}
      to={to}
      tip={count}
      tooltip={{
        content: "thumbnails",
        position: "bottom",
        color: "primary",
      }}
      text="Thumbnails"
    />
  );
}
