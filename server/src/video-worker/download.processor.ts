import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Phase } from '@prisma/client';
import { Job, Queue } from 'bull';
import { DownloadService } from 'src/core/external-services/youtube-downloader/download.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { queueNames } from 'src/shared/constants';

@Processor(queueNames.download)
export class DownloadProcessor {
  constructor(
    private readonly downloadService: DownloadService,
    @InjectQueue(queueNames.video) private readonly videoProcessor: Queue,
    private readonly prismaService: PrismaService,
  ) {}

  @Process()
  async processDownload(job: Job) {
    console.log('processDownload', job.data);
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
          phase: Phase.DOWNLOAD,
        },
      },
    });
    if (!existingPhase) {
      await this.prismaService.processingPhase.create({
        data: {
          uploadsVideoId: videoId.id,
          phase: Phase.DOWNLOAD,
        },
      });
    }

    await this.downloadService.download(job.data);
    await this.prismaService.processingPhase.update({
      where: {
        uploadsVideoId_phase: {
          uploadsVideoId: videoId.id,
          phase: Phase.DOWNLOAD,
        },
      },
      data: {
        endedAt: new Date(),
      },
    });
    this.videoProcessor.add(job.data);
    return;
  }
}
