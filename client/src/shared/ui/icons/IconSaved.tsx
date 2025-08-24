import { Save } from "lucide-react";
import { routes } from "@shared/routes";
import { ViewType } from "@shared/api";
import { IconButton } from "@shared/ui";

export function IconSaved({ 
  ytChannelId, 
  count = 0 
}: { 
  ytChannelId?: string;
  count?: number;
}) {
  const to = ytChannelId ? routes.savedChannel(ytChannelId) : routes.dashboard(ViewType.Saved);
  
  return (
    <IconButton
      icon={<Save />}
      to={to}
      tip={count}
      tooltip={{
        content: "saved",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
