import { ClockIcon } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconRecentlyViewed() {
  return (
    <IconButton
      icon={<ClockIcon />}
      to={`/recently-viewed`}
      tooltip={{
        content: "recently viewed",
        position: "right",
        color: "primary",
      }}
    />
  );
}
