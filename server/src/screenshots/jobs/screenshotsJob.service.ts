import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { spawn } from 'child_process';
import { EventsService } from 'src/core/events/events.service';
import { ScreenshotsManagerService } from 'src/screenshots/manager/screenshots-manager.service';

export type CaptureScreenshotsData = {
  ytChannelId: string;
  ytVideoId: string;
};

@Injectable()
export class ScreenshotsJobService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly screenshotsManagerService: ScreenshotsManagerService,
  ) {}

  async captureScreenshots({ ytChannelId, ytVideoId }: CaptureScreenshotsData) {
    const { screenshotsPath, videoPath } =
      this.screenshotsManagerService.getPaths(ytChannelId, ytVideoId);

    this.eventsService.sendEvent('screenshots_start', ytVideoId);

    let currentScreenshot = 0;

    const ffmpegArgs = [
      '-i',
      videoPath,
      '-vf',
      'fps=1',
      '-start_number',
      '1',
      path.join(screenshotsPath, `${ytVideoId}-%d.png`),
    ];
    console.log('ffmpegArgs', ffmpegArgs);

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn('ffmpeg', ffmpegArgs);

      ffmpeg.stderr.on('data', () => {
        currentScreenshot++;
        this.eventsService.sendEvent(
          'screenshots_progress',
          ytVideoId,
          currentScreenshot.toString(),
        );
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          console.log('Screenshots captured successfully for the whole video.');
          this.eventsService.sendEvent('screenshots_finish', ytVideoId);
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}`));
        }
      });
    });

    console.log('All screenshots captured successfully.');

    return currentScreenshot;
  }
}
