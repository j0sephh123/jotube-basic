import { Controller, Get, Param } from '@nestjs/common';
import { ThumbnailsApiService } from './api/thumbnails-api.service';

@Controller('thumbnails-api')
export class ThumbnailsApiController {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Get('getByYtVideoId/:ytVideoId')
  async getByYtVideoId(@Param('ytVideoId') ytVideoId: string) {
    return this.thumbnailsApiService.getByYtVideoId(ytVideoId);
  }

  @Get('channel/:ytChannelId/screenshots')
  getChannelScreenshots(@Param('ytChannelId') ytChannelId: string) {
    return this.thumbnailsApiService.getChannelScreenshots(ytChannelId);
  }
}
