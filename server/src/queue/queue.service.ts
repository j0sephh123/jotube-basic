import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { queueNames } from 'src/shared/constants';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { LabelsDto } from 'src/queue/dtos/labels.dto';
import { RemoveJobsDto } from 'src/queue/dtos/remove-jobs.dto';
import { AddVideosv2Dto } from './dtos/add-videos-v2.dto';
import { AddEpisodeJobDto } from './dtos/add-episode.dto';
import { AddStoryboardJobDto } from './dtos/add-storyboard-job.dto';
import { ArtifactType } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(queueNames.download) private readonly downloadProcessor: Queue,
    @InjectQueue(queueNames.storyboard)
    private readonly storyboardProcessor: Queue,
    private readonly prismaService: PrismaService,
    @InjectQueue(queueNames.video) private readonly videoProcessor: Queue,
    @InjectQueue(queueNames.episode) private readonly episodeProcessor: Queue,
  ) {}

  async addUploads(addVideosDto: AddVideosv2Dto[]) {
    const [firstItem] = addVideosDto;

    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: firstItem.channelId,
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const jobs = firstItem.ytVideoIds.map((ytVideoId) => ({
      ytVideoId,
      ytChannelId: channel.ytId,
      type: 'downloadAndCaptureScreenshotsAndGenerateThumbnails' as const,
    }));

    const existingJobs = await this.downloadProcessor.getJobs([
      'active',
      'waiting',
    ]);
    const existingYtVideoIds = existingJobs.map((job) => job.data.ytVideoId);
    const jobsToAdd = jobs.filter(
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

  async addStoryboardJob({ ids, resourceType }: AddStoryboardJobDto) {
    const existingJobs = await this.storyboardProcessor.getJobs([
      'active',
      'waiting',
    ]);
    const existingVideoIds = existingJobs.map((job) => job.data.ytVideoId);

    if (resourceType === 'video') {
      ids.map(async (ytVideoId) => {
        if (existingVideoIds.includes(ytVideoId)) {
          return;
        }

        const upload = await this.prismaService.uploadsVideo.findUnique({
          where: { ytId: ytVideoId },
          select: {
            channel: { select: { ytId: true } },
          },
        });

        const ytChannelId = upload?.channel?.ytId || '';
        await this.storyboardProcessor.add({ ytVideoId, ytChannelId });
      });

      return { success: true };
    }

    if (resourceType === 'channel') {
      const videoIds = await this.prismaService.uploadsVideo.findMany({
        where: {
          channel: {
            ytId: {
              in: ids,
            },
          },
          artifact: ArtifactType.VIDEO,
        },
        select: { ytId: true, channel: { select: { ytId: true } } },
      });

      videoIds.map(async (videoId) => {
        if (existingVideoIds.includes(videoId.ytId)) {
          return;
        }

        await this.storyboardProcessor.add({
          ytVideoId: videoId.ytId,
          ytChannelId: videoId.channel.ytId,
        });
      });

      return { success: true };
    }
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
        id: true,
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
        .map((item) => [item.ytId, { title: item.title, id: item.id }]),
    );

    const channelTitles = Object.fromEntries(
      channelLabelsResponse.map((item) => [item.ytId, item.title]),
    );

    const mappedQueueData = queueData.map((item) => ({
      id: item.id,
      state: item.state,
      ytChannelId: item.ytChannelId,
      ytVideoId: item.ytVideoId,
      videoId: videoTitles[item.ytVideoId]?.id || null,
      videoTitle: videoTitles[item.ytVideoId]?.title || item.ytVideoId,
      channelTitle: channelTitles[item.ytChannelId] || item.ytChannelId,
    }));

    const queueDataWithSomePromises = mappedQueueData.map(async (item) => {
      if (item.state === 'active') {
        const phases = await this.prismaService.processingPhase.findMany({
          where: {
            uploadsVideoId: item.videoId,
          },
        });

        return {
          ...item,
          phases,
        };
      }

      return item;
    });

    const promisedQueueData = Promise.all(queueDataWithSomePromises);

    return promisedQueueData;
  }

  async addEpisodeJob({ episodeId }: AddEpisodeJobDto) {
    const existingJobs = await this.episodeProcessor.getJobs([
      'active',
      'waiting',
    ]);
    const existingIds = existingJobs.map((job) => job.data.episodeId);

    if (!existingIds.includes(episodeId)) {
      await this.episodeProcessor.add({ episodeId });
    }

    return { success: true };
  }

  async getDlAndVideoJobs() {
    const [downloadJobs, videoJobs] = await Promise.all([
      this.downloadProcessor.getJobs(['active', 'waiting']),
      this.videoProcessor.getJobs(['active', 'waiting']),
    ]);

    return { downloadJobs, videoJobs };
  }

  async getProcessingReadyUploads() {
    const result = await this.prismaService.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM UploadsVideo uv
      INNER JOIN Channel c ON uv.channelId = c.id
      LEFT JOIN Playlist p ON c.playlistId = p.id
      WHERE uv.artifact = 'SAVED'
      AND (p.name IS NULL OR p.name != 'SkipDL')
    `;

    return { count: Number(result[0].count) };
  }
}
