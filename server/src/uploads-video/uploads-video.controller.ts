import { Controller, Get, Param } from '@nestjs/common';
import { UploadsVideoService } from './uploads-video.service';

@Controller('uploads-video')
export class UploadsVideoController {
  constructor(private readonly uploadsVideoService: UploadsVideoService) {}

  @Get('/storyboards/:ytChannelId')
  storyboards(@Param('ytChannelId') ytChannelId: string) {
    return this.uploadsVideoService.storyboards(ytChannelId);
  }
}
