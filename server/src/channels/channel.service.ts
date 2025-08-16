import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { createChannelDto } from './dtos/create-channel.dto';
import { ArtifactType } from '@prisma/client';
import { ViewType, DashboardChannel } from 'src/dashboard/types';
import { ArtifactsAggregatorService } from 'src/artifacts-aggregator/artifacts-aggregator.service';
import { ChannelMessage } from './dtos/create-channel.response';

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

    return { success: true, message: 'Channel deleted successfully' };
  }

  async create({ ytVideoId }: createChannelDto) {
    let ytChannelId: string;
    try {
      ytChannelId = await this.youtubeService.getChannelIdByVideoId(ytVideoId);
    } catch {
      return {
        ytChannelId: null,
        message: ChannelMessage.INVALID_VIDEO_ID,
      };
    }

    try {
      await this.ensureChannelDoesntExist(ytChannelId);
    } catch {
      return {
        ytChannelId,
        message: ChannelMessage.ALREADY_EXISTS,
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
        ytChannelId,
        message: ChannelMessage.CREATED_SUCCESSFULLY,
      };
    } catch {
      return {
        ytChannelId,
        message: ChannelMessage.FAILED_TO_CREATE,
      };
    }
  }

  async metadata(ytChannelId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
      select: {
        id: true,
        title: true,
        ytId: true,
        src: true,
        fetchedUntilEnd: true,
        videoCount: true,
        lastSyncedAt: true,
        playlist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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
      playlist: channel.playlist,
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
        playlist: {
          select: {
            id: true,
            name: true,
          },
        },
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
      playlist: {
        id: number;
        name: string;
      } | null;
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
      playlist: channel.playlist,
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

  async getByYtId(ytChannelId: string) {
    const channel = await this.prismaService.channel.findUnique({
      where: { ytId: ytChannelId },
      select: {
        id: true,
        title: true,
        ytId: true,
        src: true,
        videoCount: true,
        createdAt: true,
        updatedAt: true,
        playlistId: true,
      },
    });

    if (!channel) throw new Error('Channel not found');

    return channel;
  }
}
