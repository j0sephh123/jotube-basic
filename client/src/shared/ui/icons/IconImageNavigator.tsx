import { Image } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconImageNavigator() {
  return (
    <IconButton
      icon={<Image />}
      to={routes.imageNavigator()}
      tooltip={{
        content: "image navigator",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
