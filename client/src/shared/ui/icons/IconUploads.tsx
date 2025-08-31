import { Video } from "lucide-react";
import { makeYtChannelId, type To } from "@shared/types";
import { IconButton } from "@shared/ui";

export function IconUploads({
  ytChannelId,
  count,
}: {
  ytChannelId?: string;
  count?: number;
}) {
  const to: To = ytChannelId ? `/channels/${makeYtChannelId(ytChannelId)}` : `/dashboard/videos`;

  return (
    <IconButton
      icon={<Video />}
      to={to}
      tip={count}
      tooltip={{
        content: "uploads",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
