import { Injectable } from '@nestjs/common';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { selectFields } from './helper';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

const PER_PAGE = 12;

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
  }: fetchDashboardDto) {
    const skip = (page - 1) * PER_PAGE;

    const isProcessedView = viewType === 'processed';

    const channels = await this.getChannels({
      status: isProcessedView ? { in: [1, 2] } : 1,
      ...(isProcessedView ? {} : { artifact: 'SAVED' }),
    });

    const channelsWithCounts = await this.getChannelsWithCounts(channels);

    let filteredChannels = channelsWithCounts;

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

  public async getDashboardCount(dto: fetchDashboardDto) {
    const isProcessedView = dto.viewType === 'processed';

    const channels = await this.getChannels({
      status: isProcessedView ? { in: [1, 2] } : 1,
      ...(isProcessedView ? {} : { artifact: 'SAVED' }),
    });

    const channelsWithCounts = await this.getChannelsWithCounts(channels);

    let filteredChannels = channelsWithCounts;

    if (dto.min !== undefined && dto.min > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = isProcessedView
          ? channel.screenshotsCount
          : channel.saved;
        return value >= dto.min;
      });
    }

    if (dto.max !== undefined && dto.max > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = isProcessedView
          ? channel.screenshotsCount
          : channel.saved;
        return value <= dto.max;
      });
    }

    if (dto.defaultMin !== undefined && dto.defaultMin > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        return channel.defaults >= dto.defaultMin;
      });
    }

    if (dto.defaultMax !== undefined && dto.defaultMax > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        return channel.defaults <= dto.defaultMax;
      });
    }

    return { total: filteredChannels.length };
  }

  private getScreenshotsCount(ytChannelId: string) {
    return this.prismaService.screenshot
      .count({
        where: {
          ytChannelId,
        },
      })
      .then((count) => {
        return count;
      });
  }

  private async getChannels(filter) {
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

  private getChannelsWithCounts(channels: any[]) {
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

  public async getChannelsWithoutScreenshots({
    sortOrder,
    page,
    perPage,
  }: {
    sortOrder: 'asc' | 'desc';
    page: number;
    perPage: number;
  }) {
    const skip = (page - 1) * perPage;

    const [data, total] = await Promise.all([
      (async () => {
        const result = await this.prismaService.channel.findMany({
          where: {
            fetchedUntilEnd: true,
            uploads: { every: { status: 0 } },
          },
          orderBy: { createdAt: sortOrder },
          select: {
            ...selectFields,
          },
          skip,
          take: perPage,
        });

        return result;
      })(),
      (async () => {
        const result = await this.prismaService.channel.count({
          where: {
            fetchedUntilEnd: true,
            uploads: { every: { status: 0 } },
          },
        });

        return result;
      })(),
    ]);

    return { channels: data, total };
  }

  public async getChannelsWithoutUploads(
    sortField: 'createdAt' | 'videoCount' = 'createdAt',
    direction: 'asc' | 'desc' = 'desc',
  ) {
    const channels = await this.prismaService.channel.findMany({
      where: {
        fetchedUntilEnd: false,
      },
      orderBy: {
        [sortField]: direction,
      },
      select: {
        id: true,
        title: true,
        ytId: true,
        createdAt: true,
        src: true,
        videoCount: true,
      },
    });

    return channels;
  }
}
