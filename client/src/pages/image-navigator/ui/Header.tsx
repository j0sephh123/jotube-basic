interface HeaderProps {
  channelTitle: string;
  videoTitle: string;
  second: number;
  total: number;
}

export default function Header({
  channelTitle,
  videoTitle,
  second,
  total,
}: HeaderProps) {
  return (
    <div className="bg-base-100 p-2 rounded-t-lg border-b mb-2">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-sm font-medium truncate">{channelTitle}</span>
        <span className="text-primary font-mono">{second}s</span>
        <span className="text-gray-600 truncate">{videoTitle}</span>
        <span className="text-xs text-gray-500 ml-auto">1/{total}</span>
      </div>
    </div>
  );
}
