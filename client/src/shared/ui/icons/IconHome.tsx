import { HomeIcon } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconHome() {
  return (
    <IconButton
      icon={<HomeIcon />}
      to={`/`}
      tooltip={{
        content: "home",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
