import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';
import { ArtifactType } from '@prisma/client';
import { GetScreenshotsInput } from '../dtos/get-screenshots.input';
import { UploadsWithThumbnailsResponse } from '../dtos/uploads-with-thumbnails.response';

type Item = {
  id: number;
  second: number;
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class ThumbnailsApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly thumbnailsManagerService: ThumbnailsManagerService,
  ) {}

  public async getScreenshots({ channelIds }: GetScreenshotsInput) {
    if (channelIds.length === 0) {
      return this.getAllChannelsScreenshots();
    }

    const screenshotsPromises = channelIds.map((channelId) =>
      this.getScreenshotsForChannel(channelId),
    );

    const channelScreenshots = await Promise.all(screenshotsPromises);

    return channelScreenshots.flat();
  }

  private async getScreenshotsForChannel(channelId: number) {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
          SELECT s.* FROM Screenshot s
          INNER JOIN Channel c ON s.ytChannelId = c.ytId
          WHERE c.id = ${channelId}
          ORDER BY RAND() 
          -- LIMIT 50
        `;

    return this.mapToScreenshots(randomScreenshots);
  }

  private async getAllChannelsScreenshots() {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
      SELECT * FROM Screenshot 
      ORDER BY RAND() 
      -- LIMIT 50
    `;

    return this.mapToScreenshots(randomScreenshots);
  }

  private mapToScreenshots(screenshots: Item[]) {
    return screenshots.map(({ id, second, ytChannelId, ytVideoId }) => ({
      ytVideoId,
      id,
      second,
      src: `http://localhost:3003/images/${ytChannelId}/${ytVideoId}/saved_screenshots/${ytVideoId}-${second}.png`,
    }));
  }

  public async uploadsWithThumbnails(
    channelIds: number[],
  ): Promise<UploadsWithThumbnailsResponse[]> {
    const resp = await this.prismaService.uploadsVideo.findMany({
      where: {
        channelId: { in: channelIds },
        artifact: ArtifactType.THUMBNAIL,
      },
      select: {
        id: true,
        ytId: true,
        channel: {
          select: { ytId: true, title: true, id: true },
        },
      },
    });

    return resp.map((video) => ({
      ytChannelId: video.channel.ytId,
      ytVideoId: video.ytId,
      channelTitle: video.channel.title,
      channelId: video.channel.id,
      videoId: video.id,
    }));
  }

  public async episodesWithThumbnails(
    episodeIds: number[],
  ): Promise<{ tvIdentifier: string; episodeIdentifier: string }[]> {
    const resp = await this.prismaService.episode.findMany({
      where: {
        id: { in: episodeIds },
        artifact: ArtifactType.THUMBNAIL,
      },
      select: {
        identifier: true,
        tv: {
          select: { identifier: true },
        },
      },
    });

    return resp.map((episode) => ({
      tvIdentifier: episode.tv.identifier,
      episodeIdentifier: episode.identifier,
    }));
  }

  public async thumbnailByUpload(ytId: string) {
    const video = await this.prismaService.uploadsVideo.findFirst({
      where: { ytId, artifact: ArtifactType.THUMBNAIL },
      select: {
        ytId: true,
        channel: {
          select: { ytId: true },
        },
      },
    });

    if (!video) {
      return null;
    }

    return {
      ytChannelId: video.channel.ytId,
      ytVideoId: video.ytId,
    };
  }

  async getByYtVideoId(videoId: number) {
    const video = await this.prismaService.uploadsVideo.findUnique({
      where: { id: videoId },
      select: {
        ytId: true,
        channel: { select: { ytId: true } },
      },
    });

    if (!video) {
      return null;
    }

    const thumbnail = await this.prismaService.thumbnail.findFirst({
      where: { uploadsVideo: { ytId: video.ytId } },
      include: {
        uploadsVideo: {
          include: {
            channel: true,
          },
        },
      },
    });

    if (
      !thumbnail ||
      !thumbnail.uploadsVideo ||
      !thumbnail.uploadsVideo.channel
    ) {
      return null;
    }

    const thumbnailsCount = await this.thumbnailsManagerService.countThumbnails(
      thumbnail.uploadsVideo.channel.ytId,
      video.ytId,
    );

    return {
      ...thumbnail,
      thumbnailsCount: thumbnailsCount - 1,
    };
  }

  public async getChannelScreenshots({ channelIds }: GetScreenshotsInput) {
    const screenshots = await this.prismaService.screenshot.findMany({
      where: {
        channel: {
          id: { in: channelIds },
        },
      },
      orderBy: [{ ytVideoId: 'asc' }, { second: 'asc' }],
      select: {
        id: true,
        second: true,
        ytChannelId: true,
        ytVideoId: true,
      },
    });

    return this.mapToScreenshots(screenshots);
  }

  public async getThumbnailsForDashboard() {
    return this.prismaService.uploadsVideo.findMany({
      where: { artifact: { in: [ArtifactType.THUMBNAIL] } },
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
  }

  public getChannelsWithThumbnails(
    result: {
      artifact: ArtifactType;
      channel: {
        id: number;
        ytId: string;
        title: string;
        src: string;
        createdAt: Date;
        videoCount: number;
      };
    }[],
  ) {
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
            createdAt: video.channel.createdAt,
            videoCount: video.channel.videoCount,
            uploadsCount: thumbnailUploadsCount[video.channel.id] || 0,
          },
        ]),
      ).values(),
    );

    return thumbnailChannels;
  }

  public getMappedChannels(
    thumbnailChannels: {
      id: number;
      ytId: string;
      title: string;
      src: string;
      createdAt: Date;
      videoCount: number;
      uploadsCount: number;
    }[],
  ) {
    return thumbnailChannels.map((channel) => ({
      id: channel.id,
      ytId: channel.ytId,
      title: channel.title,
      src: channel.src,
      createdAt: channel.createdAt,
      lastSyncedAt: null,
      videoCount: channel.videoCount || 0,
      thumbnails: channel.uploadsCount,
      saved: 0,
      defaults: 0,
      screenshotsCount: 0,
    }));
  }
}
