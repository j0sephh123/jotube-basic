import { Injectable } from '@nestjs/common';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import {
  ChannelWithUploads,
  DashboardChannelWithUploads,
  DashboardResponse,
  ViewType,
} from './types';
import {
  getChannelsWithThumbnails,
  getMappedChannels,
  getThumbnails,
  filterChannels,
  getSortedChannels,
} from './thumbnails-helper';
import {
  getChannelsWithoutUploadsOrScreenshots,
  mapChannelsWithoutUploadsOrScreenshots,
  filterChannelsWithoutUploadsOrScreenshots,
  sortChannelsWithoutUploadsOrScreenshots,
} from './channels-helper';

const PER_PAGE = 12;

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

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

    if (viewType === ViewType.THUMBNAILS) {
      const result = await getThumbnails(this.prismaService);
      const thumbnailChannels = getChannelsWithThumbnails(result);
      let channels = getMappedChannels(thumbnailChannels);
      channels = filterChannels(channels, min, max, defaultMin, defaultMax);
      const sorted = getSortedChannels(channels, sortOrder);

      return {
        channels: sorted.slice(skip, skip + PER_PAGE),
        total: sorted.length,
      };
    }

    if (
      viewType === ViewType.CHANNELS_WITHOUT_UPLOADS ||
      viewType === ViewType.CHANNELS_WITHOUT_SCREENSHOTS
    ) {
      const channels = await getChannelsWithoutUploadsOrScreenshots(
        this.prismaService,
        viewType,
      );
      let mappedChannels = mapChannelsWithoutUploadsOrScreenshots(channels);
      mappedChannels = filterChannelsWithoutUploadsOrScreenshots(
        mappedChannels,
        defaultMin,
        defaultMax,
      );
      const sorted = sortChannelsWithoutUploadsOrScreenshots(
        mappedChannels,
        sortOrder,
      );

      return {
        channels: sorted.slice(skip, skip + PER_PAGE),
        total: sorted.length,
      };
    }

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
        id: true,
        createdAt: true,
        title: true,
        ytId: true,
        src: true,
        lastSyncedAt: true,
        videoCount: true,
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
}
