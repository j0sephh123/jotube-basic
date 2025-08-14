import { Controller, Get, Query } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';

@Controller('storyboard')
export class StoryboardController {
  constructor(private readonly storyboardService: StoryboardService) {}

  @Get('uploadsWithStoryboards')
  async getUploadsWithStoryboards(@Query('ytChannelId') ytChannelId: string) {
    return this.storyboardService.getUploadsWithStoryboards(ytChannelId);
  }
}
