import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/core/external-services/youtube-api/youtube.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { createChannelDto } from './dtos/create-channel.dto';
import { ArtifactType } from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
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

    const [
      videoArtifactsCount,
      savedArtifactsCount,
      thumbnailArtifactsCount,
      screenshotArtifactsCount,
    ] = await Promise.all([
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId: channel.id,
            artifact: ArtifactType.VIDEO,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId: channel.id,
            artifact: ArtifactType.SAVED,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId: channel.id,
            artifact: ArtifactType.THUMBNAIL,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.screenshot.count({
          where: {
            ytChannelId: channel.ytId,
          },
        });
        return count;
      })(),
    ]);

    return {
      videoArtifactsCount,
      savedArtifactsCount,
      thumbnailArtifactsCount,
      screenshotArtifactsCount,
      id: channel.id,
      title: channel.title,
      ytId: channel.ytId,
      src: channel.src,
      fetchedUntilEnd: channel.fetchedUntilEnd,
      videoCount: channel.videoCount,
      lastSyncedAt: channel.lastSyncedAt,
    };
  }

  // TODO this is returned even if non-existing id is passed
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
