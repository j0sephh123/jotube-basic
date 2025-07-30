import { Controller, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { ScreenshotsApiService } from './screenshots-api.service';

@Controller('screenshots-api')
export class ScreenshotsApiController {
  constructor(private readonly screenshotsApiService: ScreenshotsApiService) {}

  @Get('screenshots')
  screenshots() {
    return this.screenshotsApiService.screenshots();
  }

  @Get('video-screenshots/:ytVideoId')
  getScreenshotsByVideo(@Param('ytVideoId') ytVideoId: string) {
    console.log({
      ytVideoId,
    });

    return this.screenshotsApiService.getScreenshotsByVideo(ytVideoId);
  }

  @Get('screenshots/:month')
  screenshotsByMonth(@Param('month') month: string) {
    return this.screenshotsApiService.screenshotsByMonth(month);
  }

  @Get('screenshots/:month/:date')
  screenshotsByDate(
    @Param('month') month: string,
    @Param('date') date: string,
  ) {
    return this.screenshotsApiService.screenshotsByDate(date);
  }

  @Put('screenshots/:id')
  updateScreenshot(@Param('id') id: string, @Body('isFav') isFav: boolean) {
    return this.screenshotsApiService.updateScreenshot(parseInt(id), { isFav });
  }

  @Delete('screenshots/:id')
  deleteScreenshot(@Param('id') id: string) {
    return this.screenshotsApiService.deleteScreenshot(parseInt(id));
  }
}
