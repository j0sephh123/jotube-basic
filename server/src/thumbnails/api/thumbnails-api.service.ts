import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ThumbnailsManagerService } from 'src/thumbnails/manager/thumbnails-manager.service';
import { ArtifactType, Prisma } from '@prisma/client';
import { UploadsWithThumbnailsResponse } from '../dtos/uploads-with-thumbnails.response';
import {
  IdType,
  UploadsWithThumbnailsInput,
} from '../dtos/uploads-with-thumbnails.input';

@Injectable()
export class ThumbnailsApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly thumbnailsManagerService: ThumbnailsManagerService,
  ) {}

  public async uploadsWithThumbnails({
    idType,
    channelIds,
    playlistId,
  }: UploadsWithThumbnailsInput): Promise<UploadsWithThumbnailsResponse[]> {
    const whereCondition: Prisma.UploadsVideoWhereInput = {};

    if (idType === IdType.CHANNEL) {
      whereCondition.channelId = { in: channelIds };
    } else if (idType === IdType.PLAYLIST) {
      whereCondition.channel = { playlistId };
    }

    const resp = await this.prismaService.uploadsVideo.findMany({
      where: {
        ...whereCondition,
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
}
