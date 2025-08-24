import { Grid2X2 } from "lucide-react";
import { routes } from "@shared/routes";
import { ViewType } from "@shared/api";
import { IconButton } from "@shared/ui";

export function IconThumbnails({
  totalThumbnails = 0,
}: {
  totalThumbnails?: number;
}) {
  return (
    <IconButton
      icon={<Grid2X2 />}
      to={routes.dashboard(ViewType.Thumbnails)}
      tip={totalThumbnails}
      tooltip={{
        content: "thumbnails",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
