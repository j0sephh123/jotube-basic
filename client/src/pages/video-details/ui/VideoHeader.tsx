import { CustomLink, CopyValue } from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";

interface VideoHeaderProps {
  channelTitle: string;
  videoTitle: string;
  videoId: number;
}

export function VideoHeader({
  channelTitle,
  videoTitle,
  videoId,
}: VideoHeaderProps) {
  const ytChannelId = useTypedParams("ytChannelId");
  const ytId = useTypedParams("ytVideoId");

  return (
    <div className="flex items-center gap-4 mb-4 min-w-0">
      <CustomLink
        to={`/channels/${makeYtChannelId(ytChannelId)}`}
        className="text-base text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
      >
        ← Back to Channel
      </CustomLink>
      <div className="text-lg text-base-content font-semibold font-mono truncate min-w-0">
        {channelTitle}
      </div>
      <div className="text-base-content/40 text-lg">•</div>
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <h2 className="text-base font-bold text-base-content font-sans truncate min-w-0">
          {videoTitle}
        </h2>
        <CopyValue value={videoId.toString()} type="id" />
        <CopyValue value={ytId} type="youtube" />
      </div>
    </div>
  );
}
