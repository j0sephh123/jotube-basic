import { Images } from "lucide-react";
import { IconButton } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";

export function IconGallery({ ytChannelId }: { ytChannelId: string }) {
  return (
    <IconButton
      icon={<Images />}
      to={`/channels/${makeYtChannelId(ytChannelId)}/gallery`}
      tooltip={{
        content: "gallery",
        position: "bottom",
        color: "primary",
      }}
    />
  );
}
