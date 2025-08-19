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
          throw new BadRequestException('ytVideoId is required for video type');
        }
        return this.getScreenshotsByVideo(request.ytVideoId);
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
    const screenshots = await this.prismaService.$queryRaw<
      Record<string, any>[]
    >`
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
      ORDER BY s.createdAt DESC
      LIMIT 100
    `;

    const formattedScreenshots = screenshots.map(this.formatScreenshot);

    return {
      screenshots: formattedScreenshots,
      metadata: {
        ytVideoId: '',
        ytChannelId: '',
        channelTitle: '',
        videoTitle: '',
      },
    };
  }

  private async getScreenshotsByVideo(
    ytVideoId: string,
  ): Promise<ImageNavigatorResponseDto> {
    const screenshots = await this.prismaService.$queryRaw<
      Record<string, any>[]
    >`
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
      WHERE s.ytVideoId = ${ytVideoId}
      ORDER BY s.second ASC
    `;

    const formattedScreenshots = screenshots.map(this.formatScreenshot);

    // Extract metadata from raw data
    const firstScreenshot = screenshots[0];
    const ytChannelId = firstScreenshot ? firstScreenshot.ytChannelId : '';
    const channelTitle = firstScreenshot ? firstScreenshot.channelTitle : '';
    const videoTitle = firstScreenshot ? firstScreenshot.videoTitle : '';

    return {
      screenshots: formattedScreenshots,
      metadata: {
        ytVideoId,
        ytChannelId,
        channelTitle,
        videoTitle,
      },
    };
  }

  private async getScreenshotsByChannel(
    ytChannelId: string,
  ): Promise<ImageNavigatorResponseDto> {
    const screenshots = await this.prismaService.$queryRaw<
      Record<string, any>[]
    >`
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
      WHERE s.ytChannelId = ${ytChannelId}
      ORDER BY s.createdAt DESC
    `;

    const formattedScreenshots = screenshots.map(this.formatScreenshot);

    return {
      screenshots: formattedScreenshots,
      metadata: {
        ytChannelId,
        ytVideoId: '',
        channelTitle: '',
        videoTitle: '',
      },
    };
  }

  private formatScreenshot(rawScreenshot: Record<string, any>): number {
    return rawScreenshot.second;
  }
}
