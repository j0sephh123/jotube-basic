import { FileStack } from "lucide-react";
import { routes } from "@shared/routes";
import { IconButton } from "@shared/ui";

export function IconStoryboard({
  ytChannelId,
  count,
}: {
  ytChannelId?: string;
  count?: number;
}) {
  const to = ytChannelId ? routes.storyboard(ytChannelId) : undefined;

  return (
    <IconButton
      icon={<FileStack />}
      to={to}
      tip={count}
      tooltip={{
        content: "storyboard",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
