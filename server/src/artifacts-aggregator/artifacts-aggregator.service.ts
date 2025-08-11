import { Injectable } from '@nestjs/common';
import { ArtifactType } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class ArtifactsAggregatorService {
  constructor(private readonly prismaService: PrismaService) {}

  async aggregateArtifacts(channelId: number) {
    const [
      videoArtifactsCount,
      savedArtifactsCount,
      thumbnailArtifactsCount,
      screenshotArtifactsCount,
      storyboardArtifactsCount,
    ] = await Promise.all([
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId,
            artifact: ArtifactType.VIDEO,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId,
            artifact: ArtifactType.SAVED,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId,
            artifact: ArtifactType.THUMBNAIL,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId,
            artifact: ArtifactType.SCREENSHOT,
          },
        });
        return count;
      })(),
      (async () => {
        const count = await this.prismaService.uploadsVideo.count({
          where: {
            channelId,
            artifact: ArtifactType.STORYBOARD,
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
      storyboardArtifactsCount,
    };
  }
}
