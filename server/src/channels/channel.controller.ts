import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Patch,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dtos/create-channel.dto';
import { UpdateChannelPlaylistDto } from '../playlist/dtos/update-channel-playlist.dto';

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

  @Patch(':id')
  updatePlaylist(
    @Param('id') id: string,
    @Body() body: UpdateChannelPlaylistDto,
  ) {
    return this.channelService.updatePlaylist(+id, body);
  }
}
