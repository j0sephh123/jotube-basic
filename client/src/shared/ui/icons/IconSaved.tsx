import { Save } from "lucide-react";
import { IconButton } from "@shared/ui";
import { makeYtChannelId, type To } from "@shared/types";

export function IconSaved({
  ytChannelId,
  count = 0,
}: {
  ytChannelId?: string;
  count?: number;
}) {
  const to: To = ytChannelId
    ? `/channels/${makeYtChannelId(ytChannelId)}/saved`
    : `/dashboard/channels/saved`;

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
