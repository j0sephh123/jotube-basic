import { Injectable } from '@nestjs/common';
import { fetchDashboardDto } from './dtos/fetch-dashboard.dto';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { DashboardChannel, DashboardResponse, ViewType } from './types';
import { ThumbnailsApiService } from 'src/thumbnails/api/thumbnails-api.service';
import { ChannelService } from 'src/channels/channel.service';

const PER_PAGE = 12;

type ValueGetter = (channel: DashboardChannel) => number;

const valueGetters: Record<string, ValueGetter> = {
  thumbnails: (channel) => channel.thumbnails,
  processed: (channel) => channel.screenshotsCount,
  saved: (channel) => channel.saved,
  'no-uploads': (channel) => new Date(channel.createdAt).getTime(),
  'no-screenshots': (channel) => new Date(channel.createdAt).getTime(),
};

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

    const rawChannels = await this.getChannelsForViewType(viewType);
    const allChannels: DashboardChannel[] =
      await this.getChannelsWithCounts(rawChannels);
    const filtered = this.filterChannels(allChannels, {
      min,
      max,
      defaultMin,
      defaultMax,
      viewType,
    });
    const sorted = this.sortChannels(filtered, sortOrder, viewType);

    return {
      channels: sorted.slice(skip, skip + PER_PAGE),
      total: sorted.length,
    };
  }

  private async getChannelsForViewType(
    viewType: ViewType,
  ): Promise<
    Array<
      Pick<
        DashboardChannel,
        | 'id'
        | 'ytId'
        | 'createdAt'
        | 'title'
        | 'src'
        | 'lastSyncedAt'
        | 'videoCount'
      >
    >
  > {
    switch (viewType) {
      case ViewType.THUMBNAILS:
        return this.getChannels({ artifact: 'THUMBNAIL' });

      case ViewType.NO_UPLOADS:
      case ViewType.NO_SCREENSHOTS:
        // ChannelService returns channels without uploads/screenshots
        return this.channelService.getChannelsWithoutUploadsOrScreenshots(
          viewType,
        );

      default:
        const isProcessed = viewType === ViewType.PROCESSED;
        const filter: any = isProcessed
          ? { status: { in: [1, 2] } }
          : { artifact: 'SAVED' };
        return this.getChannels(filter);
    }
  }

  private async getChannels(
    filter: any,
  ): Promise<
    Array<
      Pick<
        DashboardChannel,
        | 'id'
        | 'ytId'
        | 'createdAt'
        | 'title'
        | 'src'
        | 'lastSyncedAt'
        | 'videoCount'
      >
    >
  > {
    const whereClause: any = {};
    if (filter.artifact) {
      whereClause.uploads = { some: { artifact: filter.artifact } };
    } else if (filter.status) {
      whereClause.screenshots = { some: {} };
    }

    return this.prismaService.channel.findMany({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
        title: true,
        ytId: true,
        src: true,
        lastSyncedAt: true,
        videoCount: true,
      },
    });
  }

  private async getUploadCounts(channelIds: number[]) {
    const rows = await this.prismaService.uploadsVideo.groupBy({
      by: ['channelId', 'artifact'],
      _count: { artifact: true },
      where: { channelId: { in: channelIds } },
    });

    const map = new Map<
      number,
      { thumbnails: number; saved: number; defaults: number }
    >();
    rows.forEach(({ channelId, artifact, _count: { artifact: count } }) => {
      if (!map.has(channelId)) {
        map.set(channelId, { thumbnails: 0, saved: 0, defaults: 0 });
      }
      const bucket = map.get(channelId)!;
      if (artifact === 'THUMBNAIL') bucket.thumbnails = count;
      if (artifact === 'SAVED') bucket.saved = count;
      if (artifact === 'VIDEO') bucket.defaults = count;
    });

    return map;
  }

  private async getChannelsWithCounts(
    channels: Array<
      Pick<
        DashboardChannel,
        | 'id'
        | 'ytId'
        | 'createdAt'
        | 'title'
        | 'src'
        | 'lastSyncedAt'
        | 'videoCount'
      >
    >,
  ): Promise<DashboardChannel[]> {
    if (channels.length === 0) return [];

    const channelIds = channels.map((c) => c.id);
    const ytIds = channels.map((c) => c.ytId);

    const screenshotCounts = await this.prismaService.screenshot.groupBy({
      by: ['ytChannelId'],
      _count: { ytChannelId: true },
      where: { ytChannelId: { in: ytIds } },
    });
    const screenshotMap = new Map(
      screenshotCounts.map((r) => [r.ytChannelId, r._count.ytChannelId]),
    );

    const uploadMap = await this.getUploadCounts(channelIds);

    return channels.map((c) => {
      const { thumbnails, saved, defaults } = uploadMap.get(c.id) || {
        thumbnails: 0,
        saved: 0,
        defaults: 0,
      };
      const screenshotsCount = screenshotMap.get(c.ytId) || 0;

      return {
        id: c.id,
        ytId: c.ytId,
        createdAt: c.createdAt,
        title: c.title,
        src: c.src,
        lastSyncedAt: c.lastSyncedAt,
        videoCount: c.videoCount,
        thumbnails,
        saved,
        defaults,
        screenshotsCount,
      };
    });
  }

  private filterChannels(
    channels: DashboardChannel[],
    filters: {
      min?: number;
      max?: number;
      defaultMin?: number;
      defaultMax?: number;
      viewType: ViewType | string;
    },
  ): DashboardChannel[] {
    let result = channels;
    const { min, max, defaultMin, defaultMax, viewType } = filters;
    const getter = valueGetters[viewType as string];

    if (getter) {
      if (min && min > 0) result = result.filter((ch) => getter(ch) >= min);
      if (max && max > 0) result = result.filter((ch) => getter(ch) <= max);
    }
    if (defaultMin && defaultMin > 0)
      result = result.filter((ch) => ch.defaults >= defaultMin);
    if (defaultMax && defaultMax > 0)
      result = result.filter((ch) => ch.defaults <= defaultMax);

    return result;
  }

  private sortChannels(
    channels: DashboardChannel[],
    sortOrder: string,
    viewType: ViewType | string,
  ): DashboardChannel[] {
    const getter = valueGetters[viewType as string];
    if (!getter) {
      // Fallback to sorting by createdAt if getter doesn't exist
      return channels.sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
      });
    }
    return channels.sort((a, b) =>
      sortOrder === 'asc' ? getter(a) - getter(b) : getter(b) - getter(a),
    );
  }
}
