import type { PropsWithChildren } from "react";

// TODO
/**
 * PlaylistGrid
 * GridPageWrapper
 * StoryboardChannel
 * StoryboardProcessing
 * Viewer
 * Thumbnails Grid
 * playlistuploadslist
 * channelpagelayout
 * dashboardwrapper
 * videosdashboard
 */
export default function Grid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}