import {
  IconRecentlyViewed,
  IconProcessingLog,
  IconTv,
  IconImageNavigator,
} from "@shared/ui";

export function Sidepanel() {
  return (
    <div className="flex flex-col gap-2">
      <IconRecentlyViewed />
      <IconProcessingLog />
      <IconImageNavigator />
      <IconTv />
    </div>
  );
}
