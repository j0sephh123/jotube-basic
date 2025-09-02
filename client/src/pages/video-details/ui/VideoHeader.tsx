import { CopyValue, Button } from "@shared/ui";
import { useTypedParams } from "@shared/hooks";
import { BackToChannel } from "./BackToChannel";

interface VideoHeaderProps {
  channelTitle: string;
  videoTitle: string;
  videoId: number;
  onRefetch: () => void;
}

export function VideoHeader({
  channelTitle,
  videoTitle,
  videoId,
  onRefetch,
}: VideoHeaderProps) {
  const ytId = useTypedParams("ytVideoId");

  return (
    <div className="flex items-center gap-4 mb-4 min-w-0">
      <BackToChannel />
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
        <Button onClick={onRefetch}>Refetch</Button>
      </div>
    </div>
  );
}
