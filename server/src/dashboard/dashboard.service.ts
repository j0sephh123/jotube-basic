import { Injectable } from '@nestjs/common';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import {
  ChannelWithUploads,
  DashboardChannelWithUploads,
  DashboardResponse,
  ViewType,
  DashboardChannel,
} from './types';
import { ThumbnailsApiService } from 'src/thumbnails/api/thumbnails-api.service';
import { ChannelService } from 'src/channels/channel.service';

const PER_PAGE = 12;

@Injectable()
export class DashboardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly thumbnailsApiService: ThumbnailsApiService,
    private readonly channelService: ChannelService,
  ) {}

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

    const channels = await this.getChannelsForViewType(viewType);
    const processedChannels = await this.processChannels(channels, viewType);
    const filteredChannels = this.filterChannels(processedChannels, {
      min,
      max,
      defaultMin,
      defaultMax,
      viewType,
    });
    const sortedChannels = this.sortChannels(
      filteredChannels,
      sortOrder,
      viewType,
    );

    return {
      channels: sortedChannels.slice(skip, skip + PER_PAGE),
      total: sortedChannels.length,
    };
  }

  private async getChannelsForViewType(viewType: ViewType): Promise<any[]> {
    switch (viewType) {
      case ViewType.THUMBNAILS:
        const result =
          await this.thumbnailsApiService.getThumbnailsForDashboard();
        const thumbnailChannels =
          this.thumbnailsApiService.getChannelsWithThumbnails(result);
        return this.thumbnailsApiService.getMappedChannels(thumbnailChannels);

      case ViewType.CHANNELS_WITHOUT_UPLOADS:
      case ViewType.CHANNELS_WITHOUT_SCREENSHOTS:
        const channels =
          await this.channelService.getChannelsWithoutUploadsOrScreenshots(
            viewType,
          );
        return this.channelService.mapChannelsWithoutUploadsOrScreenshots(
          channels,
        );

      default:
        const isProcessedView = viewType === ViewType.PROCESSED;
        const filter = {
          status: isProcessedView ? { in: [1, 2] } : 1,
          ...(isProcessedView ? {} : { artifact: 'SAVED' }),
        };
        const rawChannels = await this.getChannels(filter);
        return this.getChannelsWithCounts(rawChannels);
    }
  }

  private async processChannels(
    channels: any[],
    viewType: ViewType,
  ): Promise<DashboardChannel[]> {
    return channels.map((channel) => {
      const rest = { ...channel };
      delete rest.uploads;
      return viewType === ViewType.PROCESSED
        ? {
            ...rest,
            screenshotsCount: channel.screenshotsCount,
          }
        : rest;
    });
  }

  private filterChannels(
    channels: DashboardChannel[],
    filters: {
      min?: number;
      max?: number;
      defaultMin?: number;
      defaultMax?: number;
      viewType: ViewType;
    },
  ): DashboardChannel[] {
    let filteredChannels = channels;

    const { min, max, defaultMin, defaultMax, viewType } = filters;

    if (min !== undefined && min > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = this.getFilterValue(channel, viewType);
        return value >= min;
      });
    }

    if (max !== undefined && max > 0) {
      filteredChannels = filteredChannels.filter((channel) => {
        const value = this.getFilterValue(channel, viewType);
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

    return filteredChannels;
  }

  private getFilterValue(
    channel: DashboardChannel,
    viewType: ViewType,
  ): number {
    switch (viewType) {
      case ViewType.THUMBNAILS:
        return channel.thumbnails;
      case ViewType.PROCESSED:
        return channel.screenshotsCount;
      case ViewType.SAVED:
        return channel.saved;
      case ViewType.CHANNELS_WITHOUT_UPLOADS:
      case ViewType.CHANNELS_WITHOUT_SCREENSHOTS:
        return channel.createdAt.getTime();
      default:
        return channel.saved;
    }
  }

  private sortChannels(
    channels: DashboardChannel[],
    sortOrder: string,
    viewType: ViewType,
  ): DashboardChannel[] {
    return channels.sort((a, b) => {
      const aValue = this.getSortValue(a, viewType);
      const bValue = this.getSortValue(b, viewType);
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }

  private getSortValue(channel: DashboardChannel, viewType: ViewType): number {
    switch (viewType) {
      case ViewType.THUMBNAILS:
        return channel.thumbnails;
      case ViewType.PROCESSED:
        return channel.screenshotsCount;
      case ViewType.SAVED:
        return channel.saved;
      case ViewType.CHANNELS_WITHOUT_UPLOADS:
      case ViewType.CHANNELS_WITHOUT_SCREENSHOTS:
        return channel.createdAt.getTime();
      default:
        return channel.saved;
    }
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
      },
    });

    return channels;
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
