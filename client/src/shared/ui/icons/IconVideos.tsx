import { SquarePlay } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconVideos() {
  return (
    <IconButton
      icon={<SquarePlay />}
      to={routes.videos()}
      tooltip={{
        content: "videos",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
