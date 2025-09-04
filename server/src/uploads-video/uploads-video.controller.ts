import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UploadsVideoService } from './uploads-video.service';
import { syncUploadsDto } from 'src/uploads-video/dtos/sync-uploads.dto';
import { cleanShortUploadsDto } from './dtos/clean-short-uploads.dto';

@Controller('uploads-video')
export class UploadsVideoController {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

  @Post('/sync-uploads')
  syncUploads(@Body() syncUploadsDto: syncUploadsDto) {
    return this.uploadsVideoService.syncUploads(syncUploadsDto);
  }

  @Post('/clean-short-uploads')
  cleanShortUploads(@Body() body: cleanShortUploadsDto) {
    return this.uploadsVideoService.cleanShortUploads(body);
  }

  @Get('/storyboards/:ytChannelId')
  storyboards(@Param('ytChannelId') ytChannelId: string) {
    return this.uploadsVideoService.storyboards(ytChannelId);
  }
}
