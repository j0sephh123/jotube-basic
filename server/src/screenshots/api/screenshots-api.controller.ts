import { Controller, Param, Put, Delete, Get } from '@nestjs/common';
import { ScreenshotsApiService } from './screenshots-api.service';

@Controller('screenshots-api')
export class ScreenshotsApiController {
  constructor(private readonly screenshotsApiService: ScreenshotsApiService) {}

  @Get('channels/:ytChannelId/video-screenshot-counts')
  getVideoScreenshotCounts(@Param('ytChannelId') ytChannelId: string) {
    return this.screenshotsApiService.getVideoScreenshotCounts(ytChannelId);
  }

  @Put('screenshots/:id')
  updateScreenshot(@Param('id') id: string) {
    return this.screenshotsApiService.toggleFeaturedScreenshot(parseInt(id));
  }

  @Delete('screenshots/:id')
  deleteScreenshot(@Param('id') id: string) {
    return this.screenshotsApiService.deleteScreenshot(parseInt(id));
  }
}
