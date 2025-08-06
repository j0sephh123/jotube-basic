import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

export const getThumbnails = (prisma: PrismaService) => {
  return prisma.uploadsVideo.findMany({
    where: { artifact: { in: ['THUMBNAIL'] } },
    select: {
      artifact: true,
      channel: {
        select: {
          id: true,
          ytId: true,
          title: true,
          src: true,
          createdAt: true,
          videoCount: true,
        },
      },
    },
  });
};

export const getChannelsWithThumbnails = (
  result: {
    artifact: $Enums.ArtifactType;
    channel: {
      id: number;
      ytId: string;
      title: string;
      src: string;
      createdAt: Date;
      videoCount: number;
    };
  }[],
) => {
  const thumbnailUploadsCount = result.reduce<Record<number, number>>(
    (acc, video) => {
      const channelId = video.channel.id;
      acc[channelId] = (acc[channelId] || 0) + 1;
      return acc;
    },
    {},
  );

  const thumbnailChannels = Array.from(
    new Map(
      result.map((video) => [
        video.channel.id,
        {
          id: video.channel.id,
          ytId: video.channel.ytId,
          title: video.channel.title,
          src: video.channel.src,
          videoCount: video.channel.videoCount,
          uploadsCount: thumbnailUploadsCount[video.channel.id] || 0,
        },
      ]),
    ).values(),
  );

  return thumbnailChannels;
};

export const getMappedChannels = (
  thumbnailChannels: {
    id: number;
    ytId: string;
    title: string;
    src: string;
    videoCount: number;
    uploadsCount: number;
  }[],
) => {
  // eslint-disable-next-line prefer-const
  let channels = thumbnailChannels.map((channel) => ({
    id: channel.id,
    ytId: channel.ytId,
    title: channel.title,
    src: channel.src,
    createdAt: new Date(),
    lastSyncedAt: null,
    videoCount: channel.videoCount || 0,
    thumbnails: channel.uploadsCount,
    saved: 0,
    defaults: 0,
    uploadsWithScreenshots: 0,
    screenshotsCount: 0,
    screenshots: [],
  }));

  return channels;
};

export const filterChannels = (
  channels: {
    id: number;
    ytId: string;
    title: string;
    src: string;
    createdAt: Date;
    lastSyncedAt: any;
    videoCount: number;
    thumbnails: number;
    saved: number;
    defaults: number;
    uploadsWithScreenshots: number;
    screenshotsCount: number;
    screenshots: any[];
  }[],
  min: number,
  max: number,
  defaultMin: number,
  defaultMax: number,
) => {
  if (min !== undefined && min > 0) {
    channels = channels.filter((channel) => channel.thumbnails >= min);
  }

  if (max !== undefined && max > 0) {
    channels = channels.filter((channel) => channel.thumbnails <= max);
  }

  if (defaultMin !== undefined && defaultMin > 0) {
    channels = channels.filter((channel) => channel.defaults >= defaultMin);
  }

  if (defaultMax !== undefined && defaultMax > 0) {
    channels = channels.filter((channel) => channel.defaults <= defaultMax);
  }

  return channels;
};

export const getSortedChannels = (channels: any[], sortOrder: string) => {
  return channels.sort((a, b) => {
    return sortOrder === 'asc'
      ? a.thumbnails - b.thumbnails
      : b.thumbnails - a.thumbnails;
  });
};
