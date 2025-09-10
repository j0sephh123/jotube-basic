import { Image } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconImageNavigator() {
  return (
    <IconButton
      icon={<Image />}
      to={`/image-navigator`}
      tooltip={{
        content: "image navigator",
        position: "right",
        color: "primary",
      }}
    />
  );
}
