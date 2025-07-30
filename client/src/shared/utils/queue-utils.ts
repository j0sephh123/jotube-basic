/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Gets distinct channel IDs from queue items
 */
export function getDistinctChannelIds(items: any[]): string[] {
  const uniqueIds = new Set<string>();
  items.forEach((item) => uniqueIds.add(item.ytChannelId));
  return Array.from(uniqueIds);
}

/**
 * Groups queue items by channel ID
 */
export function groupByChannel(
  items: any[]
): Record<string, any[]> {
  const channelIds = getDistinctChannelIds(items);
  return channelIds.reduce((acc, channelId) => {
    acc[channelId] = items.filter((item) => item.ytChannelId === channelId);
    return acc;
  }, {} as Record<string, any[]>);
}

/**
 * Gets all waiting job IDs
 */
export function getWaitingJobIds(items: any[]): string[] {
  return items
    .filter((item) => item.state === "waiting")
    .map((item) => item.id);
}

/**
 * Gets active job IDs
 */
export function getActiveJobIds(items: any[]): string[] {
  return items.filter((item) => item.state === "active").map((item) => item.id);
}
