import { type ScreenshotGroup } from "@features/Gallery";

export function GalleryVideoHeader({ group }: { group: ScreenshotGroup }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-500">
      <span className="font-mono">
        {group.screenshots[0]!.second}s -{" "}
        {group.screenshots[group.screenshots.length - 1]!.second}s
      </span>
      <span>({group.screenshots.length} screenshots)</span>
      {group.timeSpan > 0 && (
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {group.timeSpan}s span
        </span>
      )}
    </div>
  );
}
