interface HeaderProps {
  channelTitle: string;
  videoTitle: string;
  second: number;
  total: number;
  index: number;
  videoIndex: number;
  totalVideos: number;
}

export default function Header({
  channelTitle,
  videoTitle,
  second,
  total,
  index,
  videoIndex,
  totalVideos,
}: HeaderProps) {
  return (
    <div className="bg-base-100 p-2 rounded-t-lg border-b mb-2">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-sm font-medium truncate">{channelTitle}</span>
        <span className="text-primary font-mono">{second}s</span>
        <span className="text-gray-600 truncate">{videoTitle}</span>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-xs text-gray-500">
            Screenshot: {index + 1}/{total}
          </span>
          <span className="text-xs text-gray-500">
            Video: {videoIndex + 1}/{totalVideos}
          </span>
        </div>
      </div>
    </div>
  );
}
