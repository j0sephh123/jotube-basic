import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { queueNames } from 'src/shared/constants';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { LabelsDto } from 'src/queue/dtos/labels.dto';
import { RemoveJobsDto } from 'src/queue/dtos/remove-jobs.dto';
import { ArtifactType } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(queueNames.download) private readonly downloadProcessor: Queue,
    @InjectQueue(queueNames.storyboard)
    private readonly storyboardProcessor: Queue,
    private readonly prismaService: PrismaService,
    @InjectQueue(queueNames.video) private readonly videoProcessor: Queue,
  ) {}

  async addUploads(
    addVideosDto: {
      downloadOption?: number;
      ytChannelId?: string;
      ytVideoIds?: string[];
    }[],
  ) {
    if (
      !addVideosDto ||
      !Array.isArray(addVideosDto) ||
      addVideosDto.length === 0
    ) {
      return { success: true };
    }

    console.log(addVideosDto);

    const allJobs = [];

    for (const item of addVideosDto) {
      if (item.ytVideoIds && item.ytVideoIds.length > 0) {
        // Handle individual video downloads
        const jobs = item.ytVideoIds.map((ytVideoId) => ({
          ytVideoId,
          ytChannelId: item.ytChannelId || '',
          type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails' as const,
        }));
        allJobs.push(...jobs);
      } else if (item.ytChannelId && item.downloadOption !== undefined) {
        // Handle channel-based downloads (original v2 logic)
        const channel = await this.prismaService.channel.findFirst({
          where: {
            ytId: item.ytChannelId,
          },
          include: {
            uploads: {
              where: {
                artifact: ArtifactType.SAVED,
              },
            },
          },
        });

        if (!channel || channel.uploads.length === 0) {
          continue;
        }

        let videosToProcess;
        if (item.downloadOption === 0) {
          videosToProcess = channel.uploads;
        } else {
          videosToProcess = channel.uploads.slice(0, item.downloadOption);
        }

        const jobs = videosToProcess.map((video) => ({
          ytVideoId: video.ytId,
          ytChannelId: item.ytChannelId,
          type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails' as const,
        }));

        allJobs.push(...jobs);
      }
    }

    if (allJobs.length === 0) {
      return { success: true };
    }

    const existingJobs = await this.downloadProcessor.getJobs([
      'active',
      'waiting',
    ]);
    const existingYtVideoIds = existingJobs.map((job) => job.data.ytVideoId);
    const jobsToAdd = allJobs.filter(
      (job) => !existingYtVideoIds.includes(job.ytVideoId),
    );

    await Promise.all(jobsToAdd.map((j) => this.downloadProcessor.add(j)));

    return { success: true };
  }

  async removeFromVideoQueue(removeJobsDto: RemoveJobsDto): Promise<any> {
    const results: { jobId: string; message: string }[] = [];

    for (const jobId of removeJobsDto.jobIds) {
      const job = await this.downloadProcessor.getJob(jobId);
      if (!job) {
        results.push({ jobId, message: 'Job not found' });
      } else {
        await job.remove();
        results.push({ jobId, message: `Job ${jobId} removed successfully` });
      }
    }
    return results;
  }

  async addStoryboardJob({ ytVideoId }: { ytVideoId: string }) {
    const existingJobs = await this.storyboardProcessor.getJobs([
      'active',
      'waiting',
    ]);
    const existingIds = existingJobs.map((job) => job.data.ytVideoId);

    if (!existingIds.includes(ytVideoId)) {
      const upload = await this.prismaService.uploadsVideo.findUnique({
        where: { ytId: ytVideoId },
        select: {
          channel: {
            select: { ytId: true },
          },
        },
      });

      const ytChannelId = upload?.channel?.ytId || '';

      await this.storyboardProcessor.add({ ytVideoId, ytChannelId });
    }

    return { success: true };
  }

  public getLabels({ items }: LabelsDto) {
    const channels = items
      .filter((item) => item.type === 'ytChannelId')
      .map((item) => item.id);

    return this.prismaService.channel
      .findMany({
        where: {
          ytId: {
            in: channels,
          },
        },
        select: {
          title: true,
          ytId: true,
        },
      })
      .then((channels) => {
        return channels;
      });
  }

  private async getVideoLabel(ytVideoId: string) {
    const video = await this.prismaService.uploadsVideo.findFirst({
      where: {
        ytId: ytVideoId,
      },
      select: {
        ytId: true,
        title: true,
        channel: {
          select: {
            title: true,
          },
        },
      },
    });

    return video;
  }

  async getQueue() {
    const [downloadJobs, storyboardJobs, videoJobs] = await Promise.all([
      this.downloadProcessor.getJobs(['active', 'waiting']),
      this.storyboardProcessor.getJobs(['active', 'waiting']),
      this.videoProcessor.getJobs(['active', 'waiting']),
    ]);

    const downloads = await Promise.all(
      downloadJobs.map(async (job) => {
        const state = await job.getState();
        return {
          id: job.id,
          state,
          ...job.data,
        } as {
          id: string;
          state: string;
          ytChannelId: string;
          ytVideoId: string;
        };
      }),
    );

    const videos = await Promise.all(
      videoJobs.map(async (job) => {
        const state = await job.getState();
        return {
          id: job.id,
          state,
          ...job.data,
        } as {
          id: string;
          state: string;
          ytChannelId: string;
          ytVideoId: string;
        };
      }),
    );

    const storyboards = await Promise.all(
      storyboardJobs.map(async (job) => {
        const state = await job.getState();
        let ytChannelId: string | undefined = job.data.ytChannelId;
        if (!ytChannelId) {
          const upload = await this.prismaService.uploadsVideo.findUnique({
            where: { ytId: job.data.ytVideoId },
            select: { channel: { select: { ytId: true } } },
          });
          ytChannelId = upload?.channel?.ytId;
        }
        return {
          id: job.id,
          state,
          ytVideoId: job.data.ytVideoId,
          ytChannelId: ytChannelId || '',
        } as {
          id: string;
          state: string;
          ytChannelId: string;
          ytVideoId: string;
        };
      }),
    );

    const queueData = [...downloads, ...storyboards, ...videos];

    const videoIds = queueData.map((item) => item.ytVideoId);
    const channelIds = [...new Set(queueData.map((item) => item.ytChannelId))];

    const [videoLabelsResponse, channelLabelsResponse] = await Promise.all([
      Promise.all(videoIds.map((id) => this.getVideoLabel(id))),
      this.getLabels({
        items: channelIds.map((id) => ({ type: 'ytChannelId', id })),
      }),
    ]);

    const videoTitles = Object.fromEntries(
      videoLabelsResponse
        .filter((item) => item !== null)
        .map((item) => [item.ytId, item.title]),
    );

    const channelTitles = Object.fromEntries(
      channelLabelsResponse.map((item) => [item.ytId, item.title]),
    );

    return queueData.map((item) => ({
      ...item,
      videoTitle: videoTitles[item.ytVideoId] || item.ytVideoId,
      channelTitle: channelTitles[item.ytChannelId] || item.ytChannelId,
    }));
  }
}
