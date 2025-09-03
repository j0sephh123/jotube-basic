import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/shared/constants';
import { QueueElement } from './add-to-queue.dto';
import { ScreenshotsJobService } from 'src/screenshots/jobs/screenshotsJob.service';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ArtifactType, Phase } from '@prisma/client';

@Processor(queueNames.video)
export class VideoProcessor {
  constructor(
    private readonly screenshotsJobService: ScreenshotsJobService,
    private readonly thumbnailsService: ThumbnailsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Process()
  async processVideo(job: Job<QueueElement>) {
    // TODO add error handling, transactions, etc
    const videoId = await this.prismaService.uploadsVideo.findUnique({
      where: {
        ytId: job.data.ytVideoId,
      },
      select: {
        id: true,
      },
    });

    if (!videoId) {
      throw new Error('Video not found');
    }

    const existingPhase = await this.prismaService.processingPhase.findUnique({
      where: {
        uploadsVideoId_phase: {
          uploadsVideoId: videoId.id,
          phase: Phase.SCREENSHOTS,
        },
      },
    });
    if (!existingPhase) {
      await this.prismaService.processingPhase.create({
        data: {
          uploadsVideoId: videoId.id,
          phase: Phase.SCREENSHOTS,
        },
      });
    }
    await this.screenshotsJobService.captureScreenshots({
      ytChannelId: job.data.ytChannelId,
      ytVideoId: job.data.ytVideoId,
    });

    await this.prismaService.processingPhase.update({
      where: {
        uploadsVideoId_phase: {
          uploadsVideoId: videoId.id,
          phase: Phase.SCREENSHOTS,
        },
      },
      data: {
        endedAt: new Date(),
      },
    });
    const existingPhase2 = await this.prismaService.processingPhase.findUnique({
      where: {
        uploadsVideoId_phase: {
          uploadsVideoId: videoId.id,
          phase: Phase.THUMBNAILS,
        },
      },
    });
    if (!existingPhase2) {
      await this.prismaService.processingPhase.create({
        data: {
          uploadsVideoId: videoId.id,
          phase: Phase.THUMBNAILS,
        },
      });
    }
    await this.thumbnailsService.generateThumbnails({
      ytChannelId: job.data.ytChannelId,
      ytVideoId: job.data.ytVideoId,
    });

    await this.prismaService.processingPhase.update({
      where: {
        uploadsVideoId_phase: {
          uploadsVideoId: videoId.id,
          phase: Phase.THUMBNAILS,
        },
      },
      data: {
        endedAt: new Date(),
      },
    });

    const uploadsVideo = await this.prismaService.uploadsVideo.update({
      where: {
        ytId: job.data.ytVideoId,
      },
      data: {
        artifact: ArtifactType.THUMBNAIL,
      },
    });

    await this.prismaService.thumbnail.create({
      data: {
        uploadsVideoId: uploadsVideo.id,
        perRow: 8,
      },
    });

    return;
  }
}
