import { LayoutDashboard } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconStoryboard() {
  return (
    <IconButton
      icon={<LayoutDashboard />}
      to={`/dashboard/channels/has-storyboards`}
      tooltip={{
        content: "storyboard",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
