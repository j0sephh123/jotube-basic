import { SquarePlay } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconVideos() {
  return (
    <IconButton
      icon={<SquarePlay />}
      to={`/dashboard/videos`}
      tooltip={{
        content: "videos",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
