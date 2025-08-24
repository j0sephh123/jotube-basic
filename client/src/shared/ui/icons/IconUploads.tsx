import { Video } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconUploads({ ytChannelId, count }: { ytChannelId?: string, count?: number }) {
  const to = ytChannelId ? routes.uploads(ytChannelId) : routes.videos();

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
