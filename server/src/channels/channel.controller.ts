import { Controller, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/metadata/:ytChannelId')
  metadata(@Param('ytChannelId') ytChannelId: string) {
    return this.channelService.metadata(ytChannelId);
  }
}
