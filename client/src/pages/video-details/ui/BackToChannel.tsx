import { makeYtChannelId } from "@shared/types";
import { CustomLink } from "@shared/ui";
import { useTypedParams } from "@shared/hooks";

export function BackToChannel() {
  const ytChannelId = useTypedParams("ytChannelId");
  return (
    <CustomLink
      to={`/channels/${makeYtChannelId(ytChannelId)}`}
      className="text-base text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
    >
      ← Back to Channel
    </CustomLink>
  );
}
