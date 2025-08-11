import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { createChannelDto } from './dtos/create-channel.dto';
import { ArtifactType } from '@prisma/client';
import { ViewType, DashboardChannel } from 'src/dashboard/types';
import { ArtifactsAggregatorService } from 'src/artifacts-aggregator/artifacts-aggregator.service';

@Injectable()
export class ChannelService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
    private readonly artifactsAggregatorService: ArtifactsAggregatorService,
  ) {}

  async delete(id: number) {
    await this.prismaService.channel.delete({
      where: {
        id,
      },
    });

    return { success: true };
  }

  async create({ ytVideoId }: createChannelDto) {
    const ytChannelId =
      await this.youtubeService.getChannelIdByVideoId(ytVideoId);

    try {
      await this.ensureChannelDoesntExist(ytChannelId);
    } catch {
      return {
        success: false,
        ytChannelId,
      };
    }

    const channel = await this.fetchChannelFromYoutube(ytChannelId);

    const fetchStartVideoId =
      await this.fetchChannelFromYoutubeByVideoId(ytChannelId);

    try {
      await this.prismaService.channel.create({
        data: {
          src: channel.src,
          title: channel.title,
          videoCount: channel.videoCount,
          ytId: channel.ytId,
          fetchStartVideoId,
        },
      });

      return {
        success: true,
        ytChannelId,
      };
    } catch {
      throw new Error('Failed to create channel');
    }
  }

  async metadata(ytChannelId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
    });

    if (!channel) throw new Error('Channel not found');

    const counts = await this.artifactsAggregatorService.aggregateArtifacts(
      channel.id,
    );

    return {
      ...counts,
      id: channel.id,
      title: channel.title,
      ytId: channel.ytId,
      src: channel.src,
      fetchedUntilEnd: channel.fetchedUntilEnd,
      videoCount: channel.videoCount,
      lastSyncedAt: channel.lastSyncedAt,
    };
  }

  public async getChannelsWithoutUploadsOrScreenshots(viewType: ViewType) {
    const isNoScreenshotsView = viewType === ViewType.NO_SCREENSHOTS;

    return this.prismaService.channel.findMany({
      where: {
        fetchedUntilEnd: isNoScreenshotsView,
        ...(isNoScreenshotsView
          ? { uploads: { every: { artifact: ArtifactType.VIDEO } } }
          : {}),
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
  }

  public mapChannelsWithoutUploadsOrScreenshots(
    channels: {
      id: number;
      ytId: string;
      title: string;
      src: string;
      createdAt: Date;
      lastSyncedAt: Date | null;
      videoCount: number;
    }[],
  ): DashboardChannel[] {
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
      screenshotsCount: 0,
      storyboard: 0,
    }));
  }

  public filterChannelsWithoutUploadsOrScreenshots(
    channels: DashboardChannel[],
    defaultMin?: number,
    defaultMax?: number,
  ): DashboardChannel[] {
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
  }

  public sortChannelsWithoutUploadsOrScreenshots(
    channels: DashboardChannel[],
    sortOrder: string,
  ): DashboardChannel[] {
    return channels.sort((a, b) => {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  private async ensureChannelDoesntExist(ytChannelId: string) {
    const existingChannel = await this.prismaService.channel.findUnique({
      where: {
        ytId: ytChannelId,
      },
    });

    if (existingChannel) {
      throw new Error('Channel already exists');
    }
  }

  private async fetchChannelFromYoutube(ytChannelId: string) {
    try {
      const channel = await this.youtubeService.getChannel(ytChannelId);
      return channel;
    } catch {
      throw new Error('Failed to fetch channel from youtube');
    }
  }

  private async fetchChannelFromYoutubeByVideoId(ytChannelId: string) {
    let fetchStartVideoId: string;
    try {
      fetchStartVideoId =
        await this.youtubeService.getLatestUploadId(ytChannelId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error('Failed to fetch latest upload from youtube');
    }

    return fetchStartVideoId;
  }
}
