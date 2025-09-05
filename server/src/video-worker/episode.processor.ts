import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/shared/constants';
import { ScreenshotsJobService } from 'src/screenshots/jobs/screenshotsJob.service';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ArtifactType, Phase } from '@prisma/client';
import { AddEpisodeJobDto } from 'src/queue/dtos/add-episode.dto';
import { FilePathService } from 'src/file/file-path.service';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

@Processor(queueNames.episode)
export class EpisodeProcessor {
  constructor(
    private readonly screenshotsJobService: ScreenshotsJobService,
    private readonly thumbnailsService: ThumbnailsService,
    private readonly prismaService: PrismaService,
    private readonly filePathService: FilePathService,
  ) {}

  @Process()
  async processEpisode(job: Job<AddEpisodeJobDto>) {
    console.log('processEpisode', job.data);
    const episode = await this.prismaService.episode.findUnique({
      where: {
        id: job.data.episodeId,
      },
      include: {
        asset: true,
        tv: true,
      },
    });
    if (!episode) {
      throw new Error('Episode not found');
    }

    const basePath = this.filePathService.getBasePath();
    const tvPath = `${basePath}/${episode.tv.identifier}`;
    const episodePath = `${tvPath}/${episode.identifier}`;
    const videoPath = path.join(
      episodePath,
      `${episode.asset.name}.${episode.asset.ext}`,
    );
    const allScreenshotsPath = path.join(episodePath, 'all_screenshots');
    if (!fs.existsSync(allScreenshotsPath)) {
      fs.mkdirSync(allScreenshotsPath, { recursive: true });
    }

    let currentScreenshot = 0;

    const ffmpegArgs = [
      '-i',
      videoPath,
      '-vf',
      'fps=1',
      '-start_number',
      '1',
      path.join(allScreenshotsPath, `${episode.identifier}-%d.png`),
    ];
    console.log('ffmpegArgs', ffmpegArgs);

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', ffmpegArgs);

      ffmpeg.stderr.on('data', () => {
        currentScreenshot++;
        console.log(
          'screenshots_progress',
          episode.identifier,
          currentScreenshot,
        );
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          console.log('Screenshots captured successfully for the whole video.');
          console.log('screenshots_finish', episode.identifier);
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}`));
        }
      });
    });

    console.log('All screenshots captured successfully.');
    // 5. don't forget to update the artifact type

    console.log(episode);

    // const videoId = await this.prismaService.uploadsVideo.findUnique({
    //   where: {
    //     ytId: job.data.ytVideoId,
    //   },
    //   select: {
    //     id: true,
    //   },
    // });

    // if (!videoId) {
    //   throw new Error('Video not found');
    // }

    // const existingPhase = await this.prismaService.processingPhase.findUnique({
    //   where: {
    //     uploadsVideoId_phase: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.SCREENSHOTS,
    //     },
    //   },
    // });
    // if (!existingPhase) {
    //   await this.prismaService.processingPhase.create({
    //     data: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.SCREENSHOTS,
    //     },
    //   });
    // }
    // await this.screenshotsJobService.captureScreenshots({
    //   ytChannelId: job.data.ytChannelId,
    //   ytVideoId: job.data.ytVideoId,
    // });

    // await this.prismaService.processingPhase.update({
    //   where: {
    //     uploadsVideoId_phase: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.SCREENSHOTS,
    //     },
    //   },
    //   data: {
    //     endedAt: new Date(),
    //   },
    // });
    // const existingPhase2 = await this.prismaService.processingPhase.findUnique({
    //   where: {
    //     uploadsVideoId_phase: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.THUMBNAILS,
    //     },
    //   },
    // });
    // if (!existingPhase2) {
    //   await this.prismaService.processingPhase.create({
    //     data: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.THUMBNAILS,
    //     },
    //   });
    // }
    // await this.thumbnailsService.generateThumbnails({
    //   ytChannelId: job.data.ytChannelId,
    //   ytVideoId: job.data.ytVideoId,
    // });

    // await this.prismaService.processingPhase.update({
    //   where: {
    //     uploadsVideoId_phase: {
    //       uploadsVideoId: videoId.id,
    //       phase: Phase.THUMBNAILS,
    //     },
    //   },
    //   data: {
    //     endedAt: new Date(),
    //   },
    // });

    // const uploadsVideo = await this.prismaService.uploadsVideo.update({
    //   where: {
    //     ytId: job.data.ytVideoId,
    //   },
    //   data: {
    //     artifact: ArtifactType.THUMBNAIL,
    //   },
    // });

    // await this.prismaService.thumbnail.create({
    //   data: {
    //     uploadsVideoId: uploadsVideo.id,
    //     perRow: 8,
    //   },
    // });

    // return;
  }
}
