import { Save } from "lucide-react";
import { routes } from "@shared/routes";
import { ViewType } from "@shared/api";
import { IconButton } from "@shared/ui";

export function IconSaved({ totalSaved = 0 }: { totalSaved?: number }) {
  return (
    <IconButton
      icon={<Save />}
      to={routes.dashboard(ViewType.Saved)}
      tip={totalSaved}
      tooltip={{
        content: "saved",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
