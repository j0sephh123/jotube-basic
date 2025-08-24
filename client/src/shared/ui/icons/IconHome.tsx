import { HomeIcon } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconHome() {
  return (
    <IconButton
      icon={<HomeIcon />}
      to={routes.home()}
      tooltip={{
        content: "home",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
