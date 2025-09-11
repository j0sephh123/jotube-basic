import { SquarePlay } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconVideos() {
  return (
    <IconButton
      icon={<SquarePlay />}
      to={`/dashboard/videos/screenshots`}
      tooltip={{
        content: "videos",
        position: "right",
        color: "primary",
      }}
    />
  );
}
