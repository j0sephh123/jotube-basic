import { Video } from "lucide-react";

export function NoVideosFound() {
  return (
    <div className="text-center py-8 text-zinc-400">
      <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
      <p className="text-sm">No videos in processing queue</p>
      <p className="text-xs mt-1">
        Videos will appear here when they're being processed
      </p>
    </div>
  );
}
