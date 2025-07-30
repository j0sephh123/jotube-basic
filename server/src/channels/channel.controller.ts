import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dtos/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() body: createChannelDto) {
    return this.channelService.create(body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.channelService.delete(+id);
  }

  @Get('/metadata/:ytChannelId')
  metadata(@Param('ytChannelId') ytChannelId: string) {
    return this.channelService.metadata(ytChannelId);
  }
}
