import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { queueNames } from 'src/shared/constants';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { AddEpisodeJobDto } from 'src/queue/dtos/add-episode.dto';
import { FilePathService } from 'src/file/file-path.service';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';
import { ArtifactType } from '@prisma/client';

@Processor(queueNames.episode)
export class EpisodeProcessor {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filePathService: FilePathService,
    private readonly thumbnailsService: ThumbnailsService,
  ) {}

  @Process()
  async processEpisode(job: Job<AddEpisodeJobDto>) {
    console.log('processEpisode', job.data);
    const episode = await this.prismaService.episode.findUnique({
      where: {
        id: job.data.episodeId,
      },
      include: {
        tv: true,
      },
    });
    if (!episode) {
      throw new Error('Episode not found');
    }

    const basePath = this.filePathService.getBasePath();
    const episodePath = `${basePath}/${episode.tv.identifier}/${episode.identifier}`;

    const videoPath = path.join(episodePath, episode.title);

    if (!fs.existsSync(videoPath)) {
      throw new Error(
        `No video file found for episode ${episode.identifier} at path: ${videoPath}`,
      );
    }
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
      path.join(allScreenshotsPath, `%d.png`),
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
    await this.thumbnailsService.generateThumbnails({
      ytChannelId: episode.tv.identifier,
      ytVideoId: episode.identifier,
      screenshotsDirArg: allScreenshotsPath,
      thumbnailsDirArg: path.join(episodePath, 'thumbnails'),
    });

    await this.prismaService.episode.update({
      where: {
        id: episode.id,
      },
      data: {
        artifact: ArtifactType.THUMBNAIL,
      },
    });

    await this.prismaService.thumbnail.create({
      data: {
        episodeId: episode.id,
        perRow: 8,
      },
    });

    console.log(episode);

    return episode;
  }
}
