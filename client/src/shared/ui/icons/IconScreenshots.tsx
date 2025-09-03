import { LayoutDashboard } from "lucide-react";
import { IconButton } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";

export function IconScreenshots({
  ytChannelId,
  count,
}: {
  ytChannelId: string;
  count: number;
}) {
  return (
    <IconButton
      icon={<LayoutDashboard />}
      to={`/channels/${makeYtChannelId(ytChannelId)}/screenshots`}
      tip={count}
      tooltip={{
        content: "screenshots",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
