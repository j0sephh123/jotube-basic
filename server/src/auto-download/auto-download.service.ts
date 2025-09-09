import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatisticsService } from '../statistics/statistics.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { QueueService } from '../queue/queue.service';
import { ArtifactType } from '@prisma/client';

const THRESHOLD_FREE_SPACE = 100;

@Injectable()
export class AutoDownloadService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly statisticsService: StatisticsService,
    private readonly queueService: QueueService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleDownload() {
    const autoDownloadSetting = await this.prismaService.setting.findFirst({
      where: {
        key: 'autoDownload',
      },
    });
    if (!autoDownloadSetting) return;

    const isAutoDownloadEnabled = autoDownloadSetting.boolValue ?? false;

    if (!isAutoDownloadEnabled) return;

    const { downloadJobs, videoJobs } =
      await this.queueService.getDlAndVideoJobs();

    const freeSpace = await this.statisticsService.getFreeSpace();

    console.log({
      freeSpace,
      downloadJobs: downloadJobs.length,
      videoJobs: videoJobs.length,
      date: new Date().toISOString(),
    });

    if (downloadJobs.length > 0) return;
    if (videoJobs.length > 0) return;
    if (freeSpace < THRESHOLD_FREE_SPACE) return;

    const video = await this.prismaService.uploadsVideo.findFirst({
      where: {
        artifact: ArtifactType.SAVED,
      },
    });

    if (!video) return;

    await this.queueService.addUploads([
      { ytVideoIds: [video.ytId], channelId: video.channelId },
    ]);
  }
}
