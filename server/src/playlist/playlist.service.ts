import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreatePlaylistDto) {
    const playlist = await this.prismaService.playlist.create({
      data: {
        name: body.name,
      },
    });

    return playlist;
  }

  async list() {
    const playlists = await this.prismaService.playlist.findMany({
      orderBy: { createdAt: 'desc' as const },
      include: {
        channels: {
          select: {
            id: true,
            title: true,
            ytId: true,
          },
        },
      },
    });

    return playlists;
  }

  async details(id: number) {
    const playlist = await this.prismaService.playlist.findUnique({
      where: { id },
      include: {
        channels: {
          orderBy: { createdAt: 'desc' as const },
        },
      },
    });

    if (!playlist) {
      throw new Error('Playlist not found');
    }

    return playlist;
  }

  async update(id: number, body: UpdatePlaylistDto) {
    const playlist = await this.prismaService.playlist.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
      },
    });

    return playlist;
  }

  async delete(id: number) {
    await this.prismaService.$transaction([
      this.prismaService.channel.updateMany({
        where: { playlistId: id },
        data: { playlistId: null },
      }),
      this.prismaService.playlist.delete({
        where: { id },
      }),
    ]);

    return { success: true };
  }
}
