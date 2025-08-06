import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ViewType, DashboardChannel } from './types';

export const getChannelsWithoutUploadsOrScreenshots = async (
  prisma: PrismaService,
  viewType: ViewType,
) => {
  const isNoScreenshotsView =
    viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS;

  return prisma.channel.findMany({
    where: {
      fetchedUntilEnd: isNoScreenshotsView,
      ...(isNoScreenshotsView ? { uploads: { every: { status: 0 } } } : {}),
    },
    select: {
      id: true,
      ytId: true,
      title: true,
      src: true,
      createdAt: true,
      lastSyncedAt: true,
      videoCount: true,
    },
  });
};

export const mapChannelsWithoutUploadsOrScreenshots = (
  channels: {
    id: number;
    ytId: string;
    title: string;
    src: string;
    createdAt: Date;
    lastSyncedAt: Date | null;
    videoCount: number;
  }[],
): DashboardChannel[] => {
  return channels.map((channel) => ({
    id: channel.id,
    ytId: channel.ytId,
    title: channel.title,
    src: channel.src,
    createdAt: channel.createdAt,
    lastSyncedAt: channel.lastSyncedAt,
    videoCount: channel.videoCount,
    thumbnails: 0,
    saved: 0,
    defaults: 0,
    uploadsWithScreenshots: 0,
    screenshotsCount: 0,
    screenshots: [],
  }));
};

export const filterChannelsWithoutUploadsOrScreenshots = (
  channels: DashboardChannel[],
  defaultMin?: number,
  defaultMax?: number,
): DashboardChannel[] => {
  let filteredChannels = channels;

  if (defaultMin !== undefined && defaultMin > 0) {
    filteredChannels = filteredChannels.filter(
      (channel) => channel.defaults >= defaultMin,
    );
  }

  if (defaultMax !== undefined && defaultMax > 0) {
    filteredChannels = filteredChannels.filter(
      (channel) => channel.defaults <= defaultMax,
    );
  }

  return filteredChannels;
};

export const sortChannelsWithoutUploadsOrScreenshots = (
  channels: DashboardChannel[],
  sortOrder: string,
): DashboardChannel[] => {
  return channels.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.createdAt.getTime() - b.createdAt.getTime()
      : b.createdAt.getTime() - a.createdAt.getTime();
  });
};
