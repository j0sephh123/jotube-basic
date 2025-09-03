import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class ConverterService {
  constructor(private readonly prismaService: PrismaService) {}

  async convertValue(
    type: string,
    value: string,
    resource?: string,
  ): Promise<{
    id: number;
    title: string;
    ytId: string;
    channelTitle?: string;
  }> {
    if (type === 'youtube') {
      if (!resource) {
        throw new Error('Resource is required when type is "youtube"');
      }
      if (resource === 'channel') {
        const channel = await this.prismaService.channel.findUnique({
          where: { ytId: value },
          select: { id: true, title: true, ytId: true },
        });
        if (!channel) {
          throw new Error('Channel not found');
        }
        return { id: channel.id, title: channel.title, ytId: channel.ytId };
      } else if (resource === 'video') {
        const upload = await this.prismaService.uploadsVideo.findUnique({
          where: { ytId: value },
          select: {
            id: true,
            title: true,
            ytId: true,
            channel: {
              select: { title: true },
            },
          },
        });
        if (!upload) {
          throw new Error('Upload not found');
        }
        return {
          id: upload.id,
          title: upload.title,
          ytId: upload.ytId,
          channelTitle: upload.channel.title,
        };
      } else {
        throw new Error('Invalid resource. Must be "video" or "channel"');
      }
    } else if (type === 'id') {
      if (!resource) {
        throw new Error('Resource is required when type is "id"');
      }
      if (resource === 'channel') {
        const channel = await this.prismaService.channel.findUnique({
          where: { id: parseInt(value) },
          select: { id: true, title: true, ytId: true },
        });
        if (!channel) {
          throw new Error('Channel not found');
        }
        return { id: channel.id, title: channel.title, ytId: channel.ytId };
      } else if (resource === 'video') {
        const upload = await this.prismaService.uploadsVideo.findUnique({
          where: { id: parseInt(value) },
          select: {
            id: true,
            title: true,
            ytId: true,
            channel: {
              select: { title: true },
            },
          },
        });
        if (!upload) {
          throw new Error('Upload not found');
        }
        return {
          id: upload.id,
          title: upload.title,
          ytId: upload.ytId,
          channelTitle: upload.channel.title,
        };
      } else {
        throw new Error('Invalid resource. Must be "video" or "channel"');
      }
    } else {
      throw new Error('Invalid type. Must be "youtube" or "id"');
    }
  }
}
