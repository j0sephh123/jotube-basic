import { Images } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconGallery({ ytChannelId }: { ytChannelId?: string }) {
  const to = ytChannelId ? routes.gallery(ytChannelId) : undefined;

  return (
    <IconButton
      icon={<Images />}
      to={to}
      tooltip={{
        content: "gallery",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
