interface HeaderProps {
  channelTitle: string;
  videoTitle: string;
  second: number;
  total: number;
  index: number;
  videoIndex: number;
  totalVideos: number;
  totalChannelScreenshots: number;
  viewedScreenshots: number;
  channelId: string;
}

export default function Header({
  channelTitle,
  videoTitle,
  second,
  total,
  index,
  videoIndex,
  totalVideos,
  totalChannelScreenshots,
  viewedScreenshots,
  channelId,
}: HeaderProps) {
  const viewedPercentage =
    totalChannelScreenshots > 0
      ? Math.round((viewedScreenshots / totalChannelScreenshots) * 100)
      : 0;

  return (
    <div className="bg-base-100 p-2 rounded-t-lg border-b mb-2">
      <div className="flex items-center gap-2 text-xs">
        <a
          href={`/channels/${channelId}`}
          className="text-sm font-medium truncate max-w-[150px] hover:text-primary transition-colors"
          title={channelTitle}
        >
          {channelTitle}
        </a>
        <span className="text-primary font-mono">{second}s</span>
        <span
          className="text-gray-600 truncate max-w-[150px]"
          title={videoTitle}
        >
          {videoTitle}
        </span>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-xs text-gray-500">
            Screenshot: {index + 1}/{total}
          </span>
          <span className="text-xs text-gray-500">
            Video: {videoIndex + 1}/{totalVideos}
          </span>
          <span className="text-xs text-gray-500">
            Channel: {viewedScreenshots}/{totalChannelScreenshots} (
            {viewedPercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
}
