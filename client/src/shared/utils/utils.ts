export function getDistinctChannelIds(
  items: { ytChannelId: string }[]
): string[] {
  const uniqueChannelIds = new Set<string>();

  items.forEach((item) => {
    if (item.ytChannelId) {
      uniqueChannelIds.add(item.ytChannelId);
    }
  });

  return Array.from(uniqueChannelIds);
}
