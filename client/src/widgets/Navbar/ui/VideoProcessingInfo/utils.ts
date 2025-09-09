import type { QueueItem } from "@shared/hooks";

/**
 * Gets distinct channel IDs from queue items
 */
function getDistinctChannelIds(items: QueueItem[]): string[] {
  const uniqueIds = new Set<string>();
  items.forEach((item) => uniqueIds.add(item.ytChannelId));
  return Array.from(uniqueIds);
}

/**
 * Groups queue items by channel ID
 */
export function groupByChannel(
  items: QueueItem[]
): Record<string, QueueItem[]> {
  const channelIds = getDistinctChannelIds(items);
  return channelIds.reduce((acc, channelId) => {
    acc[channelId] = items.filter((item) => item.ytChannelId === channelId);
    return acc;
  }, {} as Record<string, QueueItem[]>);
}

/**
 * Gets all waiting job IDs
 */
export function getWaitingJobIds(items: QueueItem[]): string[] {
  return items
    .filter((item) => item.state === "waiting")
    .map((item) => item.id);
}
