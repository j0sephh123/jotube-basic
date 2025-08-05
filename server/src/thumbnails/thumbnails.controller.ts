import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ThumbnailsApiService } from './api/thumbnails-api.service';

@Controller('thumbnails-api')
export class ThumbnailsApiController {
  constructor(private readonly thumbnailsApiService: ThumbnailsApiService) {}

  @Post()
  getSlides(@Body() ytChannelIds: string[]) {
    return this.thumbnailsApiService.getSlides(ytChannelIds);
  }

  @Get('thumbnails-view')
  groupedThumbnails() {
    return this.thumbnailsApiService.thumbnailsView();
  }

  @Post('/uploadsWithThumbnails')
  uploadsWithThumbnails(@Body() { channelIds }: { channelIds: number[] }) {
    return this.thumbnailsApiService.uploadsWithThumbnails(channelIds);
  }

  @Get('thumbnail-by-upload/:ytId')
  thumbnailByUpload(@Param('ytId') ytId: string) {
    return this.thumbnailsApiService.thumbnailByUpload(ytId);
  }

  @Post('thumbnails')
  thumbnails(
    @Body()
    {
      order = 'desc',
      filterField = 'publishedAt',
    }: {
      order?: 'asc' | 'desc';
      filterField?: 'publishedAt' | 'totalSeconds';
    },
  ) {
    return this.thumbnailsApiService.thumbnails({ order, filterField });
  }

  @Get('getByYtVideoId/:ytVideoId')
  async getByYtVideoId(@Param('ytVideoId') ytVideoId: string) {
    return this.thumbnailsApiService.getByYtVideoId(ytVideoId);
  }

  @Get('channel/:ytChannelId/screenshots')
  getChannelScreenshots(@Param('ytChannelId') ytChannelId: string) {
    return this.thumbnailsApiService.getChannelScreenshots(ytChannelId);
  }
}
