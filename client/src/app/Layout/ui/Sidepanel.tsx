import {
  IconRecentlyViewed,
  IconProcessingLog,
  IconImageNavigator,
  IconSimpleStorybook,
} from "@shared/ui";

export function Sidepanel() {
  return (
    <div className="flex flex-col gap-2">
      <IconRecentlyViewed />
      <IconProcessingLog />
      <IconImageNavigator />
      <IconSimpleStorybook />
    </div>
  );
}
