import { Injectable } from '@nestjs/common';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { selectFields } from './helper';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ViewType } from './types';

const PER_PAGE = 12;

interface ChannelWithUploads {
  id: number;
  createdAt: Date;
  title: string;
  ytId: string;
  src: string;
  lastSyncedAt: Date | null;
  uploads: Array<{
    id: number;
    ytId: string;
    artifact: string;
  }>;
  screenshots: Array<{
    ytVideoId: string;
    second: number;
  }>;
}

interface DashboardChannel {
  id: number;
  createdAt: Date;
  title: string;
  ytId: string;
  src: string;
  lastSyncedAt: Date | null;
  thumbnails: number;
  saved: number;
  defaults: number;
  uploadsWithScreenshots: number;
  screenshotsCount: number;
  screenshots: Array<{
    ytVideoId: string;
    second: number;
  }>;
}

interface DashboardChannelWithUploads extends DashboardChannel {
  uploads: Array<{
    id: number;
    ytId: string;
    artifact: string;
  }>;
}

interface DashboardResponse {
  channels: DashboardChannel[];
  total: number;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO: transition from offset to cursor based pagination
  public async fetchDashboard({
    page,
    sortOrder,
    min,
    max,
    defaultMin,
    defaultMax,
    viewType,
  }: fetchDashboardDto): Promise<DashboardResponse> {
    const skip = (page - 1) * PER_PAGE;

    const isProcessedView = viewType === 'processed';

    const channels = await this.getChannels({
      status: isProcessedView ? { in: [1, 2] } : 1,
      ...(isProcessedView ? {} : { artifact: 'SAVED' }),
    });

    const channelsWithCounts = await this.getChannelsWithCounts(channels);

    let filteredChannels: DashboardChannelWithUploads[] = channelsWithCounts;

    if (min !== undefined && min > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = isProcessedView
          ? channel.screenshotsCount
          : channel.saved;
        return value >= min;
      });
    }

    if (max !== undefined && max > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = isProcessedView
          ? channel.screenshotsCount
          : channel.saved;
        return value <= max;
      });
    }

    if (defaultMin !== undefined && defaultMin > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        return channel.defaults >= defaultMin;
      });
    }

    if (defaultMax !== undefined && defaultMax > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        return channel.defaults <= defaultMax;
      });
    }

    const sorted = filteredChannels.sort((a, b) => {
      const aValue = isProcessedView ? a.screenshotsCount : a.saved;
      const bValue = isProcessedView ? b.screenshotsCount : b.saved;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const paginated = {
      channels: sorted.slice(skip, skip + PER_PAGE),
      total: sorted.length,
    };

    return {
      channels: paginated.channels.map((channel) => {
        const rest = { ...channel };
        delete rest.uploads;
        return isProcessedView
          ? {
              ...rest,
              screenshotsCount: channel.screenshotsCount,
            }
          : rest;
      }),
      total: paginated.total,
    };
  }

  private async getScreenshotsCount(ytChannelId: string): Promise<number> {
    return this.prismaService.screenshot.count({
      where: {
        ytChannelId,
      },
    });
  }

  private async getChannels(filter: any): Promise<ChannelWithUploads[]> {
    const whereClause: any = {};

    if (filter.artifact) {
      whereClause.uploads = { some: filter };
    } else if (filter.status) {
      whereClause.screenshots = {
        some: {},
      };
    }

    const channels = await this.prismaService.channel.findMany({
      where: whereClause,
      select: {
        ...selectFields,
        uploads: {
          select: {
            id: true,
            ytId: true,
            artifact: true,
          },
        },
        screenshots: {
          where: {
            isFav: true,
          },
          select: {
            ytVideoId: true,
            second: true,
          },
        },
      },
    });

    const channelsWithScreenshots = await Promise.all(
      channels.map(async (channel) => {
        if (channel.screenshots.length > 0) {
          return channel;
        }

        const firstScreenshot = await this.prismaService.screenshot.findFirst({
          where: {
            ytChannelId: channel.ytId,
          },
          select: {
            ytVideoId: true,
            second: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        return {
          ...channel,
          screenshots: firstScreenshot ? [firstScreenshot] : [],
        };
      }),
    );

    return channelsWithScreenshots;
  }

  private getChannelsWithCounts(
    channels: ChannelWithUploads[],
  ): Promise<DashboardChannelWithUploads[]> {
    return Promise.all(
      channels.map(async (channel) => {
        const saved = channel.uploads.filter(
          (upload) => upload.artifact === 'SAVED',
        ).length;
        const thumbnails = channel.uploads.filter(
          (upload) => upload.artifact === 'THUMBNAIL',
        ).length;
        const defaults = channel.uploads.filter(
          (upload) => upload.artifact === 'VIDEO',
        ).length;
        const uploadsWithScreenshots = channel.uploads.filter(
          (upload) => upload.artifact === 'SCREENSHOT',
        );

        const screenshotsCount = await this.getScreenshotsCount(channel.ytId);

        return {
          ...channel,
          thumbnails,
          saved,
          defaults,
          uploadsWithScreenshots: uploadsWithScreenshots.length,
          screenshotsCount,
        };
      }),
    );
  }

  public async getChannelsWithoutUploadsOrScreenshots(viewType: ViewType) {
    if (viewType === ViewType.THUMBNAILS) {
      return this.thumbnailsView();
    }

    const isNoScreenshotsView =
      viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS;

    const channels = await this.prismaService.channel.findMany({
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

    return channels;
  }

  public async thumbnailsView() {
    const result = await this.prismaService.uploadsVideo.findMany({
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
          },
        },
      },
    });

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
            uploadsCount: thumbnailUploadsCount[video.channel.id] || 0,
          },
        ]),
      ).values(),
    );

    return {
      thumbnailChannels,
      thumbnailChannelIds: thumbnailChannels.map(
        (channel: { id: number }) => channel.id,
      ),
    };
  }
}
