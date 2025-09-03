export const getLastSyncColor = (lastSync: string | null) => {
  if (!lastSync) return "text-gray-400";
  const hoursSinceSync =
    (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60);
  if (hoursSinceSync < 1) return "text-green-400";
  if (hoursSinceSync < 24) return "text-yellow-400";
  return "text-red-400";
};

export const formatLastSync = (lastSync: string | null) => {
  if (!lastSync) return "Never";
  const hoursSinceSync =
    (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60);
  if (hoursSinceSync < 1) return "Now";
  if (hoursSinceSync < 24) return `${Math.floor(hoursSinceSync)}h`;
  return `${Math.floor(hoursSinceSync / 24)}d`;
};