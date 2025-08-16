import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dtos/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() createChannelDto: createChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @Get('/metadata/:ytChannelId')
  metadata(@Param('ytChannelId') ytChannelId: string) {
    return this.channelService.metadata(ytChannelId);
  }
}
