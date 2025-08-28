import { Injectable } from '@nestjs/common';
import { FetchDashboardInput } from './dtos/fetch-dashboard.input';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { DashboardChannel, ViewType, DashboardVideo } from './types';
import {
  ChannelsDashboardResponse,
  VideosDashboardResponse,
} from './dtos/dashboard.response';
import { ChannelService } from 'src/channels/channel.service';
import { ServiceLogger } from 'src/logging/service-logger';
import { ArtifactType, Prisma } from '@prisma/client';

const PER_PAGE = 12;

type ValueGetter = (channel: DashboardChannel) => number;

const valueGetters: Record<string, ValueGetter> = {
  thumbnails: (channel) => channel.thumbnails,
  processed: (channel) => channel.screenshotsCount,
  saved: (channel) => channel.saved,
  storyboard: (channel) => channel.storyboard,
  'no-uploads': (channel) => new Date(channel.createdAt).getTime(),
  'no-screenshots': (channel) => new Date(channel.createdAt).getTime(),
};

@Injectable()
export class DashboardService {
  private log: ReturnType<ServiceLogger['bindFromFile']>;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelService: ChannelService,
    private readonly serviceLogger: ServiceLogger,
  ) {
    this.log = this.serviceLogger.bindFromFile(__filename);
  }

  public async fetchDashboard({
    page,
    sortOrder,
    min,
    max,
    defaultMin,
    defaultMax,
    viewType,
  }: FetchDashboardInput): Promise<ChannelsDashboardResponse> {
    this.log.infoStart({
      viewType,
    });
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

    const featuredScreenshotsData =
      await this.prismaService.channelFeaturedScreenshot.findMany({
        include: {
          screenshot: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    const channelsWithFeaturedScreenshots = sorted.map((channel) => ({
      ...channel,
      featuredScreenshots: featuredScreenshotsData
        .filter((fs) => fs.screenshot.ytChannelId === channel.ytId)
        .map((fs) => ({
          id: fs.screenshot.id,
          second: fs.screenshot.second,
          ytVideoId: fs.screenshot.ytVideoId,
          src: `${fs.screenshot.ytChannelId}/${fs.screenshot.ytVideoId}/saved_screenshots/${fs.screenshot.ytVideoId}-${fs.screenshot.second}.png`,
        })),
    }));

    return {
      channels: channelsWithFeaturedScreenshots.slice(skip, skip + PER_PAGE),
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
        | 'playlist'
      >
    >
  > {
    switch (viewType) {
      case ViewType.THUMBNAILS:
        return this.getChannels({ artifact: ArtifactType.THUMBNAIL });

      case ViewType.HAS_STORYBOARDS:
        return this.getChannels({ artifact: ArtifactType.STORYBOARD });

      case ViewType.NO_UPLOADS:
      case ViewType.NO_SCREENSHOTS:
        return this.channelService.getChannelsWithoutUploadsOrScreenshots(
          viewType,
        );

      default:
        const isProcessed = viewType === ViewType.PROCESSED;
        const filter: any = isProcessed
          ? { status: { in: [1, 2] } }
          : { artifact: ArtifactType.SAVED };
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
        | 'playlist'
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
        playlist: {
          select: {
            id: true,
            name: true,
          },
        },
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
      {
        thumbnails: number;
        saved: number;
        defaults: number;
        storyboard: number;
      }
    >();
    rows.forEach(({ channelId, artifact, _count: { artifact: count } }) => {
      if (!map.has(channelId)) {
        map.set(channelId, {
          thumbnails: 0,
          saved: 0,
          defaults: 0,
          storyboard: 0,
        });
      }
      const bucket = map.get(channelId)!;

      if (artifact === 'THUMBNAIL') bucket.thumbnails = count;
      if (artifact === 'SAVED') bucket.saved = count;
      if (artifact === 'VIDEO') bucket.defaults = count;
      if (artifact === 'STORYBOARD') bucket.storyboard = count;
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
        | 'playlist'
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
      const { thumbnails, saved, defaults, storyboard } = uploadMap.get(
        c.id,
      ) || {
        thumbnails: 0,
        saved: 0,
        defaults: 0,
        storyboard: 0,
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
        playlist: c.playlist,
        thumbnails,
        saved,
        defaults,
        storyboard,
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

  public async fetchVideosDashboard(filters?: {
    page?: number;
    sortOrder?: 'asc' | 'desc';
    screenshotMin?: number;
    screenshotMax?: number;
  }): Promise<VideosDashboardResponse> {
    const page = filters?.page || 1;
    const sortOrder = filters?.sortOrder || 'desc';
    const screenshotMin = filters?.screenshotMin;
    const screenshotMax = filters?.screenshotMax;
    const offset = (page - 1) * PER_PAGE;

    const orderDirection = sortOrder === 'asc' ? 'ASC' : 'DESC';

    const rows = await this.prismaService.$queryRaw<any[]>(Prisma.sql`
      SELECT
        uv.id,
        uv.ytId,
        uv.title,
        uv.src,
        c.id    AS channelId,
        c.title AS channelTitle,
        c.ytId  AS channelYtId,
        COUNT(s.id) AS screenshotCount
      FROM UploadsVideo AS uv
      JOIN Channel AS c
        ON c.id = uv.channelId
      JOIN Screenshot AS s
        ON s.ytVideoId = uv.ytId
      GROUP BY
        uv.id, uv.ytId, uv.title, uv.src, c.id, c.title, c.ytId
      HAVING COUNT(s.id) > 0
      ORDER BY screenshotCount ${Prisma.raw(orderDirection)}, uv.id DESC
    `);

    let filteredRows = rows;

    if (screenshotMin !== undefined && screenshotMin > 0) {
      filteredRows = filteredRows.filter(
        (row) => Number(row.screenshotCount) >= screenshotMin,
      );
    }

    if (screenshotMax !== undefined && screenshotMax > 0) {
      filteredRows = filteredRows.filter(
        (row) => Number(row.screenshotCount) <= screenshotMax,
      );
    }

    const total = filteredRows.length;
    const paginatedRows = filteredRows.slice(offset, offset + PER_PAGE);

    const featuredScreenshotsData =
      await this.prismaService.channelFeaturedScreenshot.findMany({
        include: {
          screenshot: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return {
      videos: paginatedRows.map(
        (r): DashboardVideo => ({
          id: r.id,
          ytId: r.ytId,
          title: r.title,
          src: r.src,
          channelId: r.channelId,
          channelTitle: r.channelTitle,
          channelYtId: r.channelYtId,
          screenshotCount: Number(r.screenshotCount),
          featuredScreenshots: featuredScreenshotsData
            .filter((fs) => fs.screenshot.ytChannelId === r.channelYtId)
            .map((fs) => ({
              id: fs.screenshot.id,
              second: fs.screenshot.second,
              ytVideoId: fs.screenshot.ytVideoId,
              src: `${fs.screenshot.ytChannelId}/${fs.screenshot.ytVideoId}/saved_screenshots/${fs.screenshot.ytVideoId}-${fs.screenshot.second}.png`,
            })),
        }),
      ) as any,
      total,
    };
  }
}
