import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() body: CreatePlaylistDto) {
    return this.playlistService.create(body);
  }

  @Get()
  list() {
    return this.playlistService.list();
  }

  @Get(':id')
  details(@Param('id') id: string) {
    return this.playlistService.details(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePlaylistDto) {
    return this.playlistService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playlistService.delete(+id);
  }
}
