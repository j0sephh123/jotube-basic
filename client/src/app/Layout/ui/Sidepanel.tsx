import {
  IconRecentlyViewed,
  IconProcessingLog,
  IconVideos,
  IconTv,
  IconPlaylist,
  IconImageNavigator,
} from "@shared/ui";

export function Sidepanel() {
  return (
    <div className="flex flex-col gap-2">
      <IconVideos />
      <IconRecentlyViewed />
      <IconProcessingLog />
      <IconImageNavigator />
      <IconPlaylist />
      <IconTv />
    </div>
  );
}
