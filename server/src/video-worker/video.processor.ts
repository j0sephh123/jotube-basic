import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/shared/constants';
import { DownloadService } from 'src/core/external-services/youtube-downloader/download.service';
import { QueueElement } from './add-to-queue.dto';
import { ScreenshotsJobService } from 'src/screenshots/jobs/screenshotsJob.service';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Processor(queueNames.video)
export class VideoProcessor {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly screenshotsJobService: ScreenshotsJobService,
    private readonly thumbnailsService: ThumbnailsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Process()
  async processVideo(job: Job<QueueElement>) {
    // TODO add error handling, transactions, etc
    await this.downloadService.download(job.data);

    await this.screenshotsJobService.captureScreenshots({
      ytChannelId: job.data.ytChannelId,
      ytVideoId: job.data.ytVideoId,
    });

    await this.thumbnailsService.generateThumbnails({
      ytChannelId: job.data.ytChannelId,
      ytVideoId: job.data.ytVideoId,
    });

    const uploadsVideo = await this.prismaService.uploadsVideo.update({
      where: {
        ytId: job.data.ytVideoId,
      },
      data: {
        artifact: 'THUMBNAIL',
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
