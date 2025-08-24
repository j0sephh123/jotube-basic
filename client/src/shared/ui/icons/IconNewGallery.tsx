import { GalleryVertical } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconNewGallery({ ytChannelId, count }: { ytChannelId?: string, count?: number }) {
  const to = ytChannelId ? routes.newGallery(ytChannelId) : undefined;

  return (
    <IconButton
      icon={<GalleryVertical />}
      to={to}
      tip={count}
      tooltip={{
        content: "new gallery",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
