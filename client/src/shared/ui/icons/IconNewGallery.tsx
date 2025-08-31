import { GalleryVertical } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconNewGallery({
  count,
  onClick,
}: {
  count?: number;
  onClick?: () => void;
}) {
  return (
    <IconButton
      icon={<GalleryVertical />}
      onClick={onClick}
      tip={count}
      tooltip={{
        content: "new gallery",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
