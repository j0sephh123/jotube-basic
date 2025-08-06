import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';
import { $Enums } from '@prisma/client';

type Item = {
  id: number;
  second: number;
  ytChannelId: string;
  ytVideoId: string;
  isFav: boolean;
};

@Injectable()
export class ThumbnailsApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly thumbnailsManagerService: ThumbnailsManagerService,
  ) {}

  public async getSlides(ytChannelIds: string[]) {
    if (ytChannelIds.length === 0) {
      return this.getAllChannelsSlides();
    }

    const slidesPromises = ytChannelIds.map((ytChannelIdArg) =>
      this.getSlidesForChannel(ytChannelIdArg),
    );

    const channelSlides = await Promise.all(slidesPromises);

    return channelSlides.flat();
  }

  private async getSlidesForChannel(ytChannelId: string) {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
          SELECT * FROM Screenshot 
          WHERE ytChannelId = ${ytChannelId}
          ORDER BY RAND() 
          -- LIMIT 50
        `;

    return this.mapToSlides(randomScreenshots);
  }

  private async getAllChannelsSlides() {
    const randomScreenshots = await this.prismaService.$queryRaw<Item[]>`
      SELECT * FROM Screenshot 
      ORDER BY RAND() 
      -- LIMIT 50
    `;

    return this.mapToSlides(randomScreenshots);
  }

  private mapToSlides(screenshots: Item[]) {
    return screenshots.map(({ id, second, ytChannelId, ytVideoId, isFav }) => ({
      ytVideoId,
      id,
      second,
      src: `http://localhost:3003/images/${ytChannelId}/${ytVideoId}/saved_screenshots/${ytVideoId}-${second}.png`,
      isFav,
    }));
  }

  public async uploadsWithThumbnails(channelIds: number[]) {
    const resp = await this.prismaService.uploadsVideo.findMany({
      where: { channelId: { in: channelIds }, artifact: 'THUMBNAIL' },
      select: {
        ytId: true,
        channel: {
          select: { ytId: true },
        },
      },
    });

    return resp.map((video) => ({
      ytChannelId: video.channel.ytId,
      ytVideoId: video.ytId,
    }));
  }

  public async thumbnailByUpload(ytId: string) {
    const video = await this.prismaService.uploadsVideo.findFirst({
      where: { ytId, artifact: 'THUMBNAIL' },
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

  public async thumbnails({
    order = 'desc',
    filterField = 'publishedAt',
  }: {
    order?: 'asc' | 'desc';
    filterField?: 'publishedAt' | 'totalSeconds';
  }) {
    const uploads = await this.prismaService.uploadsVideo.findMany({
      where: { artifact: 'THUMBNAIL' },
      select: {
        id: true,
        ytId: true,
        title: true,
        publishedAt: true,
        channel: {
          select: {
            id: true,
            ytId: true,
            title: true,
          },
        },
        thumbnail: {
          select: {
            createdAt: true,
            id: true,
            perRow: true,
            totalSeconds: true,
          },
        },
      },
      orderBy:
        filterField === 'publishedAt'
          ? { publishedAt: order }
          : { thumbnail: { totalSeconds: order } },
    });

    return uploads;
  }

  async getByYtVideoId(ytVideoId: string) {
    const thumbnail = await this.prismaService.thumbnail.findFirst({
      where: { uploadsVideo: { ytId: ytVideoId } },
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
      ytVideoId,
    );

    return {
      ...thumbnail,
      thumbnailsCount: thumbnailsCount - 1,
    };
  }

  public async getChannelScreenshots(ytChannelId: string) {
    const screenshots = await this.prismaService.screenshot.findMany({
      where: {
        ytChannelId,
      },
      orderBy: [{ ytVideoId: 'asc' }, { second: 'asc' }],
      select: {
        id: true,
        second: true,
        ytChannelId: true,
        ytVideoId: true,
        isFav: true,
      },
    });

    return this.mapToSlides(screenshots);
  }

  public async getThumbnailsForDashboard() {
    return this.prismaService.uploadsVideo.findMany({
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
            videoCount: true,
          },
        },
      },
    });
  }

  public getChannelsWithThumbnails(
    result: {
      artifact: $Enums.ArtifactType;
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
