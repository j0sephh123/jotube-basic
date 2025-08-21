import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import {
  ImageNavigatorRequestDto,
  ImageNavigatorType,
} from './dtos/image-navigator.request';
import { ImageNavigatorResponseDto } from './dtos/image-navigator.response';

@Injectable()
export class ImageNavigatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScreenshots(
    request: ImageNavigatorRequestDto,
  ): Promise<ImageNavigatorResponseDto> {
    switch (request.type) {
      case ImageNavigatorType.ALL:
        return this.getAllScreenshots();
      case ImageNavigatorType.VIDEO:
        if (!request.ytVideoId) {
          return this.getScreenshotsByRandomVideo(request.skipChannels);
        }
        return this.getScreenshotsByVideo(
          request.ytVideoId,
          request.skipChannels,
        );
      case ImageNavigatorType.CHANNEL:
        if (!request.ytChannelId) {
          throw new BadRequestException(
            'ytChannelId is required for channel type',
          );
        }
        return this.getScreenshotsByChannel(request.ytChannelId);
      default:
        throw new BadRequestException('Invalid type');
    }
  }

  private async getAllScreenshots(): Promise<ImageNavigatorResponseDto> {
    const channels = await this.prismaService.$queryRaw<Record<string, any>[]>`
      SELECT DISTINCT
        c.ytId as ytChannelId,
        c.title as channelTitle
      FROM Channel c
      JOIN Screenshot s ON c.ytId = s.ytChannelId
      ORDER BY c.title ASC
      LIMIT 10
    `;

    const result = await Promise.all(
      channels.map(async (channel) => {
        const videos = await this.getVideosForChannel(channel.ytChannelId);
        return {
          ytChannelId: channel.ytChannelId,
          channelTitle: channel.channelTitle,
          videos,
        };
      }),
    );

    return {
      channels: result,
    };
  }

  private async getScreenshotsByVideo(
    ytVideoId: string,
    skipChannels?: string[],
  ): Promise<ImageNavigatorResponseDto> {
    let videoData: Record<string, any>[];

    if (skipChannels && skipChannels.length > 0) {
      const placeholders = skipChannels.map(() => '?').join(',');
      const query = `
        SELECT 
          s.ytChannelId,
          c.title as channelTitle
        FROM Screenshot s
        JOIN Channel c ON s.ytChannelId = c.ytId
        WHERE s.ytVideoId = ?
        AND s.ytChannelId NOT IN (${placeholders})
        LIMIT 1
      `;
      videoData = await this.prismaService.$queryRawUnsafe<
        Record<string, any>[]
      >(query, ytVideoId, ...skipChannels);
    } else {
      videoData = await this.prismaService.$queryRaw<Record<string, any>[]>`
        SELECT 
          s.ytChannelId,
          c.title as channelTitle
        FROM Screenshot s
        JOIN Channel c ON s.ytChannelId = c.ytId
        WHERE s.ytVideoId = ${ytVideoId}
        LIMIT 1
      `;
    }

    if (videoData.length === 0) {
      throw new BadRequestException('Video not found or all channels skipped');
    }

    const ytChannelId = videoData[0].ytChannelId;
    const channelTitle = videoData[0].channelTitle;

    const videos = await this.getVideosForChannel(ytChannelId);

    return {
      channels: [
        {
          ytChannelId,
          channelTitle,
          videos,
        },
      ],
    };
  }

  private async getScreenshotsByRandomVideo(
    skipChannels?: string[],
  ): Promise<ImageNavigatorResponseDto> {
    let screenshots: Record<string, any>[];

    if (skipChannels && skipChannels.length > 0) {
      const placeholders = skipChannels.map(() => '?').join(',');
      const query = `
        SELECT 
          s.id,
          s.second,
          s.ytChannelId,
          s.ytVideoId,
          c.title as channelTitle,
          v.title as videoTitle
        FROM Screenshot s
        JOIN Channel c ON s.ytChannelId = c.ytId
        JOIN UploadsVideo v ON s.ytVideoId = v.ytId
        WHERE s.ytChannelId NOT IN (${placeholders})
        ORDER BY RAND()
        LIMIT 1
      `;
      screenshots = await this.prismaService.$queryRawUnsafe<
        Record<string, any>[]
      >(query, ...skipChannels);
    } else {
      screenshots = await this.prismaService.$queryRaw<Record<string, any>[]>`
        SELECT 
          s.id,
          s.second,
          s.ytChannelId,
          s.ytVideoId,
          c.title as channelTitle,
          v.title as videoTitle
        FROM Screenshot s
        JOIN Channel c ON s.ytChannelId = c.ytId
        JOIN UploadsVideo v ON s.ytVideoId = v.ytId
        ORDER BY RAND()
        LIMIT 1
      `;
    }

    if (screenshots.length === 0) {
      throw new BadRequestException('No screenshots found');
    }

    const randomVideoId = screenshots[0].ytVideoId;
    return this.getScreenshotsByVideo(randomVideoId, skipChannels);
  }

  private async getScreenshotsByChannel(
    ytChannelId: string,
  ): Promise<ImageNavigatorResponseDto> {
    const channelData = await this.prismaService.$queryRaw<
      Record<string, any>[]
    >`
      SELECT c.title as channelTitle
      FROM Channel c
      WHERE c.ytId = ${ytChannelId}
      LIMIT 1
    `;

    if (channelData.length === 0) {
      throw new BadRequestException('Channel not found');
    }

    const videos = await this.getVideosForChannel(ytChannelId);

    return {
      channels: [
        {
          ytChannelId,
          channelTitle: channelData[0].channelTitle,
          videos,
        },
      ],
    };
  }

  private async getVideosForChannel(ytChannelId: string): Promise<any[]> {
    const videos = await this.prismaService.$queryRaw<Record<string, any>[]>`
      SELECT DISTINCT
        v.ytId as ytVideoId,
        v.title as title
      FROM UploadsVideo v
      JOIN Screenshot s ON v.ytId = s.ytVideoId
      WHERE s.ytChannelId = ${ytChannelId}
      ORDER BY v.title ASC
    `;

    const result = await Promise.all(
      videos.map(async (video) => {
        const screenshots = await this.prismaService.$queryRaw<
          Record<string, any>[]
        >`
          SELECT s.second
          FROM Screenshot s
          WHERE s.ytVideoId = ${video.ytVideoId}
          ORDER BY s.second ASC
        `;

        return {
          title: video.title,
          ytVideoId: video.ytVideoId,
          screenshots: screenshots.map((s) => s.second),
        };
      }),
    );

    return result;
  }

  private formatScreenshot(rawScreenshot: Record<string, any>): number {
    return rawScreenshot.second;
  }
}
